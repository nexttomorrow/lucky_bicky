import { updateSubscription, updateUserRole, USER_ROLES } from '../firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  increment, 
  arrayUnion 
} from 'firebase/firestore';

// 구독 유형 상수
export const SUBSCRIPTION_TYPES = {
  FORTUNE: 'FORTUNE_PREMIUM',
  LOTTO: 'LOTTO_PREMIUM',
  COMBO: 'PREMIUM_COMBO',
  NAMING: 'NAMING_SERVICE'
};

// 구독 가격 정보
export const getPlanPrice = (planType, duration = 1) => {
  const monthlyPrices = {
    [SUBSCRIPTION_TYPES.FORTUNE]: 9900,
    [SUBSCRIPTION_TYPES.LOTTO]: 19900,
    [SUBSCRIPTION_TYPES.COMBO]: 24900,
    [SUBSCRIPTION_TYPES.NAMING]: {
      1: 50000,  // 1회
      3: 120000, // 3회
      5: 190000  // 5회
    }
  };

  if (planType === SUBSCRIPTION_TYPES.NAMING) {
    return monthlyPrices[planType][duration];
  }

  return monthlyPrices[planType] * duration;
};

// VIP 자격 확인 함수
export const checkVIPEligibility = async (userId) => {
  const db = getFirestore();
  const userDoc = await getDoc(doc(db, 'users', userId));
  const userData = userDoc.data();

  const hasActiveSubscription = userData.subscription?.status === 'ACTIVE';
  const hasEnoughReferrals = userData.benefits?.referralCount >= 5;

  if (hasActiveSubscription && hasEnoughReferrals) {
    await updateUserRole(userId, USER_ROLES.VIP);
    return true;
  }
  return false;
};

// 구독 처리 함수
export const handleSubscription = async (userId, planType, duration, role) => {
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
      purchasedAt: now
    };

    // 작명 서비스의 경우
    if (planType === SUBSCRIPTION_TYPES.NAMING) {
      await updateDoc(doc(db, 'users', userId), {
        'benefits.namingCredits': increment(duration),
        'role': role,
        'roleUpdatedAt': now,
        'subscription.history': arrayUnion(subscriptionHistory)
      });
      return;
    }

    // 일반 구독의 경우
    const updateData = {
      'role': role,
      'roleUpdatedAt': now,
      'subscription.status': 'ACTIVE',
      'subscription.plan': planType,
      'subscription.startDate': now,
      'subscription.endDate': endDate,
      'subscription.autoRenewal': true,
      'subscription.lastPaymentDate': now,
      'subscription.nextPaymentDate': endDate,
      'subscription.history': arrayUnion(subscriptionHistory)
    };

    await updateDoc(doc(db, 'users', userId), updateData);

  } catch (error) {
    console.error('구독 처리 실패:', error);
    throw new Error('구독 처리에 실패했습니다.');
  }
};

// 서비스 접근 권한 확인 함수
export const checkServiceAccess = async (userId, serviceType) => {
  const db = getFirestore();
  const userDoc = await getDoc(doc(db, 'users', userId));
  const userData = userDoc.data();

  if (!userData) return false;

  // VIP는 모든 서비스 이용 가능
  if (userData.role === USER_ROLES.VIP) return true;

  const subscription = userData.subscription;
  if (!subscription || subscription.status !== 'ACTIVE') return false;

  switch (serviceType) {
    case SUBSCRIPTION_TYPES.FORTUNE:
      return subscription.plan === SUBSCRIPTION_TYPES.FORTUNE || 
             subscription.plan === SUBSCRIPTION_TYPES.COMBO;
    
    case SUBSCRIPTION_TYPES.LOTTO:
      return subscription.plan === SUBSCRIPTION_TYPES.LOTTO || 
             subscription.plan === SUBSCRIPTION_TYPES.COMBO;
    
    case SUBSCRIPTION_TYPES.NAMING:
      return userData.benefits?.namingCredits > 0;
    
    default:
      return false;
  }
};

// 작명 서비스 이용권 차감 함수
export const useNamingCredit = async (userId) => {
  const db = getFirestore();
  const userDoc = await getDoc(doc(db, 'users', userId));
  const userData = userDoc.data();

  if (!userData.benefits?.namingCredits || userData.benefits.namingCredits <= 0) {
    throw new Error('이용 가능한 작명 횟수가 없습니다.');
  }

  await updateDoc(doc(db, 'users', userId), {
    'benefits.namingCredits': userData.benefits.namingCredits - 1
  });
}; 