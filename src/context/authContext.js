import { useState, useEffect, createContext } from "react"
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export const AuthContext = createContext();

const provider = new GoogleAuthProvider();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const signOutFromGoogle = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (signedInUser) => {
      setUser(signedInUser);
    });
  });

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutFromGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
};