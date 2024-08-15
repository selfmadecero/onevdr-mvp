import { addDocument, getLatestDocumentVersion, updateDocument } from './firestore';
import { uploadFile } from './storage';
import { classifyFileWithAI, optimizeFileNameWithAI, analyzeDocumentWithAI, compareDocumentVersionsWithAI } from './openai';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

export const classifyFile = async (fileName: string, fileContent: string): Promise<string> => {
  return await classifyFileWithAI(fileName, fileContent);
};

export const optimizeFileName = async (originalFileName: string, category: string, fileContent: string): Promise<string> => {
  return await optimizeFileNameWithAI(originalFileName, category, fileContent);
};

interface FileDocument {
  id: string;
  version: number;
  isLatest: boolean;
  // 다른 필요한 속성들을 여기에 추가하세요
}

export const handleFileUpload = async (file: File, onProgress: (progress: number) => void) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("사용자가 인증되지 않았습니다");
    }

    const downloadURL = await uploadFile(file, onProgress);

    const fileContent = await file.text();
    const category = await classifyFileWithAI(file.name, fileContent);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연
    const optimizedFileName = await optimizeFileNameWithAI(file.name, category, fileContent);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연
    const analysis = await analyzeDocumentWithAI(fileContent);

    const latestVersion = await getLatestDocumentVersion('files', file.name) as any;
    let version = 1;
    let comparisonResult = null;

    if (latestVersion && typeof latestVersion.version === 'number') {
      version = latestVersion.version + 1;
      await updateDocument('files', latestVersion.id, { isLatest: false });

      if (latestVersion.fileContent) {
        comparisonResult = await compareDocumentVersionsWithAI(latestVersion.fileContent, fileContent);
      }
    }

    const filePath = `documents/${user.uid}/${file.name}`;
    const fileData = {
      originalFileName: file.name,
      optimizedFileName,
      category,
      downloadURL,
      version,
      isLatest: true,
      uploadedAt: new Date(),
      status: 'completed',
      userId: user.uid,
      filePath,
      analysis,
      fileContent,
      comparisonResult
    };

    const docId = await addDocument('files', fileData);

    return { ...fileData, id: docId };
  } catch (error: unknown) {
    console.error("파일 업로드 처리 중 오류 발생: ", error);
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      // Rate limit 오류 처리
      console.log("API 사용량 초과. 잠시 후 다시 시도해주세요.");
      // 여기에 사용자에게 오류 메시지를 표시하는 로직을 추가하세요.
    }
    throw error;
  }
};