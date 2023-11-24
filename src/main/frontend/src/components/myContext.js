import { createContext, useContext } from 'react';

// createContext를 사용하여 새로운 context를 생성합니다.
const MyContext = createContext();

// 컨텍스트 프로바이더를 내보냅니다.
export function MyContextProvider({ children }) {
  // 컨텍스트 프로바이더에서 사용할 상태나 함수를 정의합니다.
  const value = {
    // 여기에 필요한 상태나 함수를 추가하세요.
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

// 커스텀 훅을 내보냅니다.
export function useMyContext() {
  return useContext(MyContext);
}