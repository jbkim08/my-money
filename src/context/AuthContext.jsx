import { createContext, useReducer } from 'react';

//인증컨텍스트 만들기
export const AuthContext = createContext();

//리듀서 메소드
export const authReducer = (state, action) => {
  switch (action.type) {
    case '':
    default:
      return state;
  }
};

//인증 프로바이더에서 useReducer를 사용하고 스테이트와 디스패치를 제공
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
