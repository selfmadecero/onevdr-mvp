import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import pdfParse from 'pdf-parse';
import { OpenAI } from 'openai';

admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();

export const processPDF = functions.firestore
  .document('files/{fileId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    if (newValue.status === 'analyzing' && previousValue.status === 'processing') {
      const filePath = newValue.filePath;

      try {
        const bucket = storage.bucket();
        const [fileContents] = await bucket.file(filePath).download();

        // PDF 내용 추출
        const pdfData = await pdfParse(fileContents);
        const pdfText = pdfData.text;

        // OpenAI API를 사용하여 문서 분석
        const openaiApiKey = functions.config().openai.key;
        const openai = new OpenAI({ apiKey: openaiApiKey });

        const documentName = newValue.originalFileName || '문서';
        const summarizedContent = pdfText.substring(0, 1000) + '...';

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-2024-08-06",
          messages: [
            {
              role: "system",
              content: "You are an expert document analyst with deep knowledge across various domains. Your task is to analyze the given document comprehensively and accurately.",
            },
            {
              role: "user",
              content: `Analyze the following document titled "${documentName}" and provide a detailed analysis:\n\n${summarizedContent}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "document_analysis",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  summary: {
                    type: "string",
                    description: "A general summary of the document in 3-5 sentences",
                  },
                  keywords: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        word: {type: "string"},
                        explanation: {type: "string"},
                      },
                      required: ["word", "explanation"],
                      additionalProperties: false,
                    },
                    description: "5-7 most important keywords or phrases with explanations",
                  },
                  categories: {
                    type: "array",
                    items: {type: "string"},
                    description: "2-3 main categories that best describe the document content",
                  },
                  tags: {
                    type: "array",
                    items: {type: "string"},
                    description: "5-7 related tags for indexing or searching the document",
                  },
                  keyInsights: {
                    type: "array",
                    items: {type: "string"},
                    description: "3-5 key insights or points derived from the document",
                  },
                  toneAndStyle: {
                    type: "string",
                    description: "A brief description of the document's tone and style",
                  },
                  targetAudience: {
                    type: "string",
                    description: "Identification of the expected target audience for this document",
                  },
                  potentialApplications: {
                    type: "array",
                    items: {type: "string"},
                    description: "2-3 potential applications or use cases for the information in this document",
                  },
                },
                required: [
                  "summary", "keywords", "categories", "tags", "keyInsights",
                  "toneAndStyle", "targetAudience", "potentialApplications",
                ],
                additionalProperties: false,
              },
            },
          },
        });

        const analysis = completion.choices[0].message.content;

        // Firestore에 분석 결과 저장
        await change.after.ref.update({
          analysis: JSON.parse(analysis),
          status: 'completed'
        });

      } catch (error) {
        console.error("Error processing PDF:", error);
        await change.after.ref.update({ status: 'error' });
      }
    }
  });