import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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
      emailVerified: false
    };

    await saveUserData(user.uid, userData);
    
    return user;
  } catch (error) {
    console.error('Firebase signUp 에러:', error); // 디버깅용
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