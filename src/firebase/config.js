import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

//본인 계정의 키등 설정값을 가지고 초기화
firebase.initializeApp(firebaseConfig);

// 파이어스토어 DB 서비스
const firedb = firebase.firestore();
// 인증 서비스
const fireauth = firebase.auth();
// DB날짜시간
const timestamp = firebase.firestore.Timestamp;

export { firedb, fireauth, timestamp };
