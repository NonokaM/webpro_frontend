import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const AuthFlagContext = createContext({});

export const AuthFlagProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuth(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthFlagContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthFlagContext.Provider>
  );
};
