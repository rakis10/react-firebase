import { User } from "firebase/auth";
import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup";
import { PropsWithChildren } from 'react';

interface Props {
    children: ReactNode
  }
export const AuthProvider = ( {children}: Props) => {
  const [user, setUser] = useState<User | null>(null);

 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};