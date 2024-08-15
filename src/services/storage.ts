import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject, UploadTask } from 'firebase/storage';
import { storage } from '../config/firebase';
import { addDocument } from './firestore';
import { getCurrentUser } from './auth';
import { User } from 'firebase/auth';

export const uploadFile = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const path = `documents/${user.uid}/${file.name}`;
    const storageRef = ref(storage, path);

    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    if (onProgress) {
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        }
      );
    }

    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Firestore에 문서 정보 저장
    await addDocument('documents', {
      filePath: path,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      downloadURL,
      uploadedAt: new Date(),
      status: 'processing',
      userId: user.uid
    });

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};

export const downloadFile = async (path: string) => {
  try {
    const url = await getDownloadURL(ref(storage, path));
    return url;
  } catch (error) {
    console.error("Error downloading file: ", error);
    throw error;
  }
};

export const listFiles = async (path: string) => {
  try {
    const listRef = ref(storage, path);
    const res = await listAll(listRef);
    return res.items;
  } catch (error) {
    console.error("Error listing files: ", error);
    throw error;
  }
};

export const deleteFile = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file: ", error);
    throw error;
  }
};

export const deleteFileFromStorage = async (filePath: string) => {
  try {
    if (!filePath || filePath.trim() === '') {
      throw new Error("Invalid file path");
    }
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file from storage: ", error);
    throw error;
  }
};