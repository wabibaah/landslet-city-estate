import { useState, useEffect } from "react";

import { getAuth, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true); // this is the same as loading in brad traversy's course

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      },
      []
    );
  });
  return { loggedIn, checkingStatus };
}
