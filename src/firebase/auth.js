import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import app from './firebase';

const auth = getAuth(app);
const db = getFirestore(app);

// Firestore에 사용자 데이터 저장
const saveUserData = async (uid, userData) => {
  try {
    await setDoc(doc(db, 'users', uid), userData);
  } catch (error) {
    console.error('Error saving user data:', error);
    throw new Error('사용자 정보 저장 중 오류가 발생했습니다.');
  }
};

// 사용자 등급 상수
export const USER_ROLES = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
  VIP: 'VIP'
};

// 회원가입
export const signUp = async ({ email, password, name, nickname, birthdate, phone, interests, referralCode }) => {
  try {
    console.log('Firebase signUp 시작:', { email }); // 디버깅용

    // 이메일/비밀번호로 계정 생성
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('계정 생성 성공:', user.uid); // 디버깅용

    // 사용자 프로필 업데이트
    await updateProfile(user, {
      displayName: nickname
    });

    // 이메일 인증 메일 발송
    await sendEmailVerification(user);

    // Firestore에 사용자 데이터 저장
    const userData = {
      name,
      nickname,
      email,
      birthdate: birthdate || null,
      phone: phone || null,
      interests: interests || [],
      referralCode: referralCode || null,
      createdAt: new Date(),
      emailVerified: false,
      // 등급 관련 정보
      role: USER_ROLES.FREE,
      roleUpdatedAt: new Date(),
      // 구독 관련 정보
      subscription: {
        status: 'INACTIVE', // 'INACTIVE', 'ACTIVE', 'EXPIRED', 'CANCELLED'
        plan: null, // 'PREMIUM', 'VIP'
        startDate: null,
        endDate: null,
        autoRenewal: false,
        paymentMethod: null,
        lastPaymentDate: null,
        nextPaymentDate: null,
        cancelledAt: null,
        history: [] // 구독 이력 저장
      },
      // 결제 관련 정보
      billing: {
        history: [], // 결제 이력
        totalSpent: 0,
        lastTransaction: null
      },
      // 혜택 관련 정보
      benefits: {
        remainingConsultations: 0, // VIP 전용 상담 횟수
        specialOffers: [], // 특별 혜택
        referralCount: 0, // 추천인 수
        rewardPoints: 0 // 리워드 포인트
      }
    };

    await saveUserData(user.uid, userData);
    return user;
  } catch (error) {
    console.error('Firebase signUp 에러:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 로그인
export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 비밀번호 재설정 메일 발송
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 에러 메시지 한글화
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/invalid-email':
      return '유효하지 않은 이메일 형식입니다.';
    case 'auth/operation-not-allowed':
      return '이메일/비밀번호 로그인이 비활성화되어 있습니다.';
    case 'auth/weak-password':
      return '비밀번호는 최소 6자리 이상이어야 합니다.';
    case 'auth/user-disabled':
      return '해당 계정은 비활성화되어 있습니다.';
    case 'auth/user-not-found':
      return '등록되지 않은 이메일입니다.';
    case 'auth/wrong-password':
      return '잘못된 비밀번호입니다.';
    default:
      return '로그인 중 오류가 발생했습니다.';
  }
};

// 사용자 등급 업데이트 함수
export const updateUserRole = async (userId, newRole) => {
  try {
    const db = getFirestore();
    await updateDoc(doc(db, 'users', userId), {
      role: newRole,
      roleUpdatedAt: new Date()
    });
  } catch (error) {
    console.error('사용자 등급 업데이트 실패:', error);
    throw new Error('사용자 등급 업데이트에 실패했습니다.');
  }
};

// 구독 상태 업데이트 함수 개선
export const updateSubscription = async (userId, planType, duration) => {
  try {
    const db = getFirestore();
    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + duration);

    // 구독 이력 생성
    const subscriptionHistory = {
      plan: planType,
      startDate: now,
      endDate: endDate,
      duration: duration,
      price: getPlanPrice(planType, duration),
      purchasedAt: now
    };

    // 등급 자동 업데이트
    let newRole = USER_ROLES.FREE;
    if (planType === 'PREMIUM') {
      newRole = USER_ROLES.PREMIUM;
    } else if (planType === 'VIP') {
      newRole = USER_ROLES.VIP;
    }

    const updateData = {
      'role': newRole,
      'roleUpdatedAt': now,
      'subscription.status': 'ACTIVE',
      'subscription.plan': planType,
      'subscription.startDate': now,
      'subscription.endDate': endDate,
      'subscription.autoRenewal': true,
      'subscription.lastPaymentDate': now,
      'subscription.nextPaymentDate': endDate,
      'subscription.history': firebase.firestore.FieldValue.arrayUnion(subscriptionHistory)
    };

    await updateDoc(doc(db, 'users', userId), updateData);

  } catch (error) {
    console.error('구독 상태 업데이트 실패:', error);
    throw new Error('구독 상태 업데이트에 실패했습니다.');
  }
};

// 구독 자동 갱신 처리 함수
export const handleSubscriptionRenewal = async (userId) => {
  const db = getFirestore();
  const userDoc = await getDoc(doc(db, 'users', userId));
  const userData = userDoc.data();

  if (!userData.subscription || userData.subscription.status !== 'ACTIVE') {
    return;
  }

  const now = new Date();
  const endDate = userData.subscription.endDate.toDate();

  // 구독 만료 3일 전에 자동 갱신 처리
  if (endDate.getTime() - now.getTime() <= 3 * 24 * 60 * 60 * 1000) {
    if (userData.subscription.autoRenewal) {
      // 결제 처리 후 구독 연장
      await updateSubscription(userId, userData.subscription.plan, 1); // 1개월 연장
    } else {
      // 구독 만료 처리
      await updateDoc(doc(db, 'users', userId), {
        'subscription.status': 'EXPIRED',
        'role': USER_ROLES.FREE,
        'roleUpdatedAt': now
      });
    }
  }
};

// 구독 취소 함수
export const cancelSubscription = async (userId) => {
  try {
    const db = getFirestore();
    const now = new Date();

    await updateDoc(doc(db, 'users', userId), {
      'subscription.autoRenewal': false,
      'subscription.cancelledAt': now
    });
  } catch (error) {
    console.error('구독 취소 실패:', error);
    throw new Error('구독 취소에 실패했습니다.');
  }
}; 