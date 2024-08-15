import { addDocument, getLatestDocumentVersion, updateDocument } from './firestore';
import { uploadFile } from './storage';
import { classifyFileWithAI, optimizeFileNameWithAI } from './openai';
import { getAuth } from 'firebase/auth';

export const classifyFile = async (fileName: string, fileContent: string): Promise<string> => {
  return await classifyFileWithAI(fileName, fileContent);
};

export const optimizeFileName = async (originalFileName: string, category: string): Promise<string> => {
  return await optimizeFileNameWithAI(originalFileName, category);
};

interface FileDocument {
  id: string;
  version: number;
  isLatest: boolean;
  // 다른 필요한 속성들을 여기에 추가하세요
}

export const handleFileUpload = async (file: File) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const downloadURL = await uploadFile(file);

    const fileContent = await file.text();
    const category = await classifyFile(file.name, fileContent);
    const optimizedFileName = await optimizeFileName(file.name, category);

    const latestVersion = await getLatestDocumentVersion('files', file.name) as FileDocument | null;
    let version = 1;

    if (latestVersion && typeof latestVersion.version === 'number') {
      version = latestVersion.version + 1;
      await updateDocument('files', latestVersion.id, { isLatest: false });
    }

    const fileData = {
      originalFileName: file.name,
      optimizedFileName,
      category,
      downloadURL,
      version,
      isLatest: true,
      uploadedAt: new Date(),
      status: 'processing',
      userId: user.uid
    };

    const docId = await addDocument('files', fileData);

    await updateDocument('files', docId, { status: 'analyzing' });

    return { ...fileData, id: docId };
  } catch (error) {
    console.error("Error handling file upload: ", error);
    if (error instanceof Error) {
      throw new Error(`File upload failed: ${error.message}`);
    } else {
      throw new Error("File upload failed due to an unknown error");
    }
  }
};