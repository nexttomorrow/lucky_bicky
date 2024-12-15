import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_KEY);

export const getGeminiResponse = async (prompt, options = {}) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const generationConfig = {
      temperature: options.temperature || 0.7,
      topK: options.topK || 40,
      topP: options.topP || 0.95,
      maxOutputTokens: options.maxTokens || 2048,
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
      generationConfig,
    });

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    throw new Error('AI 응답을 받아오는데 실패했습니다.');
  }
};

// 이미지 분석용
export const analyzeImage = async (image, prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: await blobToBase64(image)
              }
            }
          ]
        }
      ]
    });

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini 이미지 분석 오류:', error);
    throw new Error('이미지 분석에 실패했습니다.');
  }
};

// Blob를 base64로 변환
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}; 