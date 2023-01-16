import React from "react";
import { Topia, WorldFactory } from "@rtsdk/topia";

const GlobalStateContext = React.createContext();
const GlobalDispatchContext = React.createContext();

function globalReducer(state, action) {
  switch (action.type) {
    case "SELECT_WORLD":
      return {
        ...state,
        urlSlug: action.payload.urlSlug,
        selectedWorld: action.payload.selectedWorld,
      };
    case "SET_INTERACTIVE_PARAMS":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        hasMessage: action.payload.hasMessage,
        message: "" + action.payload.message,
        messageType: action.payload.messageType,
      };
    case "REMOVE_MESSAGE":
      return {
        ...state,
        hasMessage: false,
        message: "",
        messageType: "",
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GlobalProvider({ children }) {
  const [state, dispatch] = React.useReducer(globalReducer, {
    urlSlug: "",
    selectedWorld: {},
  });
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

function useGlobalState() {
  const context = React.useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
}

function useGlobalDispatch() {
  const context = React.useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error("useGlobalDispatch must be used within a GlobalProvider");
  }
  return context;
}

function setInteractiveParams({
  assetId,
  dispatch,
  visitorId,
  interactiveNonce,
  interactivePublicKey,
  urlSlug,
}) {
  const isInteractiveIframe =
    visitorId && interactiveNonce && interactivePublicKey && assetId;
  dispatch({
    type: "SET_INTERACTIVE_PARAMS",
    payload: {
      assetId,
      visitorId,
      interactiveNonce,
      interactivePublicKey,
      urlSlug,
      isInteractiveIframe,
    },
  });
}

// eslint-disable-next-line no-unused-vars
async function fetchWorld({ apiKey, dispatch, urlSlug }) {
  if (!apiKey || !urlSlug) return;
  const topia = new Topia({ apiKey });
  const selectedWorld = new WorldFactory(topia).create(urlSlug);
  try {
    await selectedWorld.fetchDetails();
    dispatch({
      type: "SELECT_WORLD",
      payload: {
        urlSlug,
        selectedWorld,
      },
    });
  } catch (error) {
    setMessage({ dispatch, message: error, messageType: "error" });
  }
}

function setMessage({ dispatch, message, messageType }) {
  dispatch({
    type: "SET_MESSAGE",
    payload: {
      hasMessage: true,
      message,
      messageType,
    },
  });
}

function removeMessage(dispatch) {
  dispatch({
    type: "REMOVE_MESSAGE",
  });
}

export {
  GlobalProvider,
  fetchWorld,
  removeMessage,
  setInteractiveParams,
  setMessage,
  useGlobalState,
  useGlobalDispatch,
};
