import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { format } from 'date-fns';

initializeApp();
const db = getFirestore();

// 매일 오전 8시에 실행되는 운세 생성 배치
export const generateDailyFortunes = functions.pubsub
  .schedule('0 8 * * *')
  .timeZone('Asia/Seoul')
  .onRun(async (context) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    try {
      // 활성 사용자 목록 조회
      const usersSnapshot = await db.collection('users')
        .where('active', '==', true)
        .get();

      const batch = db.batch();
      const promises = [];

      usersSnapshot.forEach(userDoc => {
        const userData = userDoc.data();
        promises.push(generateUserFortune(userData, today, batch));
      });

      await Promise.all(promises);
      await batch.commit();

      console.log(`${promises.length}명의 사용자 운세 생성 완료`);
      return null;
    } catch (error) {
      console.error('운세 배치 처리 실패:', error);
      throw error;
    }
  });

async function generateUserFortune(userData, date, batch) {
  const fortuneRef = db.collection('fortunes').doc(`${userData.uid}_${date}`);
  
  // 이미 생성된 운세가 있는지 확인
  const fortuneDoc = await fortuneRef.get();
  if (fortuneDoc.exists()) {
    return;
  }

  // 운세 생성 로직...
  const fortuneData = {
    userId: userData.uid,
    date: date,
    createdAt: new Date(),
    // ... 운세 데이터
  };

  batch.set(fortuneRef, fortuneData);
} 