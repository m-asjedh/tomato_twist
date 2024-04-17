import React, { createContext, useState } from "react";

// creating an authentication context with initial values
// current logged-in user set the user
export const AuthContext = createContext({
  user: null,
  setUser: () => null,
});

// authentication provider component
export const AuthProvider = ({ children }) => {
  // state for holding the current logged in user
  const [user, setUser] = useState(null);
  // providing the authentication context to children
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
