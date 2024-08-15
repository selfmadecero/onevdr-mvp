import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const classifyFileWithAI = async (fileName: string, fileContent: string): Promise<string> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that classifies files into categories: Legal Documents, Financial Documents, Business Plan Documents, Investor Relations Documents, Due Diligence Documents, or Miscellaneous."
          },
          {
            role: "user",
            content: `Classify this file based on its name and content. File name: ${fileName}. File content: ${fileContent}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error classifying file with AI:', error);
    return 'Miscellaneous';
  }
};

export const optimizeFileNameWithAI = async (originalFileName: string, category: string): Promise<string> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that optimizes file names for better organization and readability."
          },
          {
            role: "user",
            content: `Optimize this file name for the category '${category}'. Original file name: ${originalFileName}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const optimizedFileName = response.data.choices[0].message.content.trim();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${optimizedFileName}_${timestamp}`;
  } catch (error) {
    console.error('Error optimizing file name with AI:', error);
    return originalFileName;
  }
};