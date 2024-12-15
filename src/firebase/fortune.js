import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getGeminiResponse } from '../utils/gemini';
import { generateFortunePrompt } from '../utils/fortunePrompt';
import { format } from 'date-fns';
import app from './firebase';

const db = getFirestore(app);

// 오늘의 운세 생성
export const generateDailyFortune = async (userData) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const fortuneRef = doc(db, 'fortunes', `${userData.uid}_${today}`);

  try {
    // 이미 생성된 운세가 있는지 확인
    const fortuneDoc = await getDoc(fortuneRef);
    if (fortuneDoc.exists()) {
      return fortuneDoc.data();
    }

    // 새로운 운세 생성
    const prompt = generateFortunePrompt(userData, today);
    const fortuneText = await getGeminiResponse(prompt);
    
    // 운세 텍스트 파싱
    const fortune = parseFortune(fortuneText);
    
    // Firestore에 저장
    const fortuneData = {
      userId: userData.uid,
      date: today,
      createdAt: new Date(),
      ...fortune
    };

    await setDoc(fortuneRef, fortuneData);
    return fortuneData;
  } catch (error) {
    console.error('운세 생성 실패:', error);
    throw new Error('운세를 생성하는데 실패했습니다.');
  }
};

// 운세 텍스트 파싱
const parseFortune = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  return {
    overall: lines.find(l => l.includes('총운'))?.split(':')[1]?.trim() || '',
    money: lines.find(l => l.includes('금전운'))?.split(':')[1]?.trim() || '',
    love: lines.find(l => l.includes('애정운'))?.split(':')[1]?.trim() || '',
    health: lines.find(l => l.includes('건강운'))?.split(':')[1]?.trim() || '',
    color: lines.find(l => l.includes('행운의 색상'))?.split(':')[1]?.trim() || '',
    direction: lines.find(l => l.includes('행운의 방향'))?.split(':')[1]?.trim() || '',
    time: lines.find(l => l.includes('행운의 시간'))?.split(':')[1]?.trim() || '',
    advice: lines.find(l => l.includes('오늘의 조언'))?.split(':')[1]?.trim() || ''
  };
};

// 사용자의 최근 운세 조회
export const getUserFortune = async (userId, date = new Date()) => {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const fortuneRef = doc(db, 'fortunes', `${userId}_${formattedDate}`);
  
  try {
    const fortuneDoc = await getDoc(fortuneRef);
    if (!fortuneDoc.exists()) {
      return null;
    }
    return fortuneDoc.data();
  } catch (error) {
    console.error('운세 조회 실패:', error);
    throw new Error('운세를 조회하는데 실패했습니다.');
  }
}; 