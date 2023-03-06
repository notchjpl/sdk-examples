import React from "react";
import { Topia, UserFactory } from "@rtsdk/topia";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return { ...state, isAuthenticated: true, user: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("apiKey"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}
// eslint-disable-next-line no-unused-vars
function fetchUser(apiKey, dispatch) {
  if (!apiKey) return;
  setTimeout(async () => {
    const topia = await new Topia(apiKey);
    const user = new UserFactory(topia).create({ apiKey });
    localStorage.setItem("apiKey", apiKey);
    dispatch({ payload: user, type: "FETCH_USER_SUCCESS" });
    // history.push("/");
  }, 2000);
}

export { UserProvider, useUserState, useUserDispatch, fetchUser };
