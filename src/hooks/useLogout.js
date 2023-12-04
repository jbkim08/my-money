import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { fireauth } from '../firebase/config';

export const useLogout = () => {
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //파이어베이스 로그아웃
      await fireauth.signOut();

      if (!isCancelled) {
        //로그아웃 액션 디스패치
        dispatch({ type: 'LOGOUT' });
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

  return { logout, error, isPending };
};
