import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  return useContext(SubscriptionContext);
};

export const SubscriptionProvider = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setSubscription({
            status: userData.subscription?.status || 'INACTIVE',
            plan: userData.subscription?.plan || null,
            endDate: userData.subscription?.endDate?.toDate() || null,
            role: userData.role || 'FREE',
            namingCredits: userData.benefits?.namingCredits || 0
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('구독 정보 로드 실패:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const getRemainingDays = () => {
    if (!subscription?.endDate) return 0;
    const now = new Date();
    const end = new Date(subscription.endDate);
    const diffTime = end - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const value = {
    subscription,
    loading,
    getRemainingDays,
    isPremium: subscription?.status === 'ACTIVE' || subscription?.role === 'VIP',
    isVIP: subscription?.role === 'VIP',
    namingCredits: subscription?.namingCredits || 0
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}; 