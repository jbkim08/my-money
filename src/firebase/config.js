import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDxPcnzzWc5BVZQqCgNJUSZtgo3L71o3ZM',
  authDomain: 'mymoney-drv98.firebaseapp.com',
  projectId: 'mymoney-drv98',
  storageBucket: 'mymoney-drv98.appspot.com',
  messagingSenderId: '715620903888',
  appId: '1:715620903888:web:2edc236f37d8fe059f67d5',
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
