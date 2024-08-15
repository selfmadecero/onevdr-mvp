import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as pdfParse from "pdf-parse";
import axios from "axios";

admin.initializeApp();

const storage = admin.storage();

export const processPDF = functions.firestore
  .document("files/{fileId}")
  .onCreate(async (snap) => {
    const fileData = snap.data();
    const filePath = fileData.filePath;

    try {
      const bucket = storage.bucket();
      const [fileContents] = await bucket.file(filePath).download();

      // PDF 내용 추출
      const pdfData = await pdfParse(fileContents);
      const pdfText = pdfData.text;

      // OpenAI API를 사용하여 문서 분석
      const openaiApiKey = functions.config().openai.key;
      const openaiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an AI assistant that analyzes documents and provides a summary and key points.",
            },
            {
              role: "user",
              content: `Analyze the document and provide a summary and key points: ${pdfText.substring(0, 1000)}...`,
            },
          ],
        },
        {
          headers: {
            "Authorization": `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      const analysis = openaiResponse.data.choices[0].message.content;

      // Firestore에 분석 결과 저장
      await snap.ref.update({
        analysis,
        category: "Analyzed",
        status: "completed",
      });
    } catch (error) {
      console.error("Error processing PDF:", error);
      await snap.ref.update({ status: "error" });
    }
  });
