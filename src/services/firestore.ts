import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc, Query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DocumentData } from 'firebase/firestore';
import { getCurrentUser } from './auth';
import { User } from 'firebase/auth';

export const addDocument = async (collectionName: string, data: any) => {
  try {
    const user = await getCurrentUser() as User;
    if (!user) {
      throw new Error("User not authenticated");
    }
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      userId: user.uid
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getDocuments = async (collectionName: string, conditions?: any[]) => {
  try {
    let q: Query<DocumentData> = collection(db, collectionName);
    if (conditions) {
      q = query(q, ...conditions.map(c => where(c.field, c.operator, c.value)));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as DocumentData) }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

export const getLatestDocumentVersion = async (collectionName: string, originalFileName: string) => {
  try {
    const q = query(
      collection(db, collectionName),
      where('originalFileName', '==', originalFileName),
      orderBy('uploadedAt', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { id: querySnapshot.docs[0].id, ...(querySnapshot.docs[0].data() as DocumentData) };
    }
    return null;
  } catch (error) {
    console.error("Error getting latest document version: ", error);
    throw error;
  }
};

export const getDocumentVersions = async (collectionName: string, originalFileName: string) => {
  try {
    const q = query(
      collection(db, collectionName),
      where('originalFileName', '==', originalFileName),
      orderBy('uploadedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as DocumentData) }));
  } catch (error) {
    console.error("Error getting document versions: ", error);
    throw error;
  }
};