import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';

export const callFunction = async (functionName: string, data: any) => {
  try {
    const func = httpsCallable(functions, functionName);
    const result = await func(data);
    return result.data;
  } catch (error) {
    console.error(`Error calling function ${functionName}: `, error);
    throw error;
  }
};