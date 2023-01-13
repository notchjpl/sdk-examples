// import React from "react";

// const JukeboxStateContext = React.createContext();
// const JukeboxDispatchContext = React.createContext();

// function jukeboxReducer(state, action) {
//   switch (action.type) {
//     case "GET_DATA_OBJECT":
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

// function JukeboxProvider({ children }) {
//   const [state, dispatch] = React.useReducer(jukeboxReducer, {
//     urlSlug: "",
//     selectedWorld: {},
//   });
//   return (
//     <GlobalStateContext.Provider value={state}>
//       <GlobalDispatchContext.Provider value={dispatch}>
//         {children}
//       </GlobalDispatchContext.Provider>
//     </GlobalStateContext.Provider>
//   );
// }

// function useGlobalState() {
//   const context = React.useContext(GlobalStateContext);
//   if (context === undefined) {
//     throw new Error("useGlobalState must be used within a GlobalProvider");
//   }
//   return context;
// }

// function useGlobalDispatch() {
//   const context = React.useContext(GlobalDispatchContext);
//   if (context === undefined) {
//     throw new Error("useGlobalDispatch must be used within a GlobalProvider");
//   }
//   return context;
// }

// function setInteractiveParams({
//   assetId,
//   dispatch,
//   playerId,
//   interactiveNonce,
//   interactivePublicKey,
//   urlSlug,
// }) {
//   dispatch({
//     type: "SET_INTERACTIVE_PARAMS",
//     payload: {
//       assetId,
//       playerId,
//       interactiveNonce,
//       interactivePublicKey,
//       urlSlug,
//     },
//   });
// }

// async function fetchWorld({ apiKey, dispatch, urlSlug }) {
//   if (!apiKey || !urlSlug) return;
//   const selectedWorld = await new World({ apiKey, urlSlug });
//   await selectedWorld
//     .fetchDetails()
//     .then(() => {
//       dispatch({
//         type: "SELECT_WORLD",
//         payload: {
//           urlSlug,
//           selectedWorld,
//         },
//       });
//     })
//     .catch((error) => {
//       setMessage({ dispatch, message: error, messageType: "error" });
//     });
// }

// function setMessage({ dispatch, message, messageType }) {
//   dispatch({
//     type: "SET_MESSAGE",
//     payload: {
//       hasMessage: true,
//       message,
//       messageType,
//     },
//   });
// }

// function removeMessage(dispatch) {
//   dispatch({
//     type: "REMOVE_MESSAGE",
//   });
// }

// export {
//   GlobalProvider,
//   fetchWorld,
//   removeMessage,
//   setInteractiveParams,
//   setMessage,
//   useGlobalState,
//   useGlobalDispatch,
// };
