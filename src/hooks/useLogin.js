import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { fireauth } from '../firebase/config';

export const useLogin = () => {
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //파이어베이스 로그인하고 인증 정보 리턴
      const res = await fireauth.signInWithEmailAndPassword(email, password);

      if (!isCancelled) {
        //로그인 액션 디스패치
        dispatch({ type: 'LOGIN', payload: res.user });
      }
      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    //로그아웃 작업중 사라지거나 종료시 return 함수가 실행됨.
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};
