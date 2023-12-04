import { useEffect, useReducer, useState } from 'react';
import { firedb, timestamp } from '../firebase/config';

//초기상태
let initalState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, errror: null };
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, errror: null };
    case 'ERROR':
      return { isPending: false, document: null, success: false, errror: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initalState);
  const [isCancelled, setIsCancelled] = useState(false);

  // DB 컬렉션 레퍼런스
  const ref = firedb.collection(collection);

  // 취소가 아닐경우에만 디스패치하기
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // doc 추가
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timestamp.fromDate(new Date()); //날짜를 타임스탬프로 바꿈
      const addedDocument = await ref.add({ ...doc, createdAt }); //DB에 저장
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, response };
};
