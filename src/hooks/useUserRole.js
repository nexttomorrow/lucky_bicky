import { useState, useEffect } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { USER_ROLES } from '../firebase/auth';

export const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setUserRole(null);
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (doc) => {
        if (doc.exists()) {
          setUserRole(doc.data().role);
        } else {
          setUserRole(USER_ROLES.FREE);
        }
        setLoading(false);
      },
      (error) => {
        console.error('사용자 등급 조회 실패:', error);
        setUserRole(USER_ROLES.FREE);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const isPremium = userRole === USER_ROLES.PREMIUM || userRole === USER_ROLES.VIP;
  const isVIP = userRole === USER_ROLES.VIP;

  return {
    userRole,
    isPremium,
    isVIP,
    loading
  };
}; 