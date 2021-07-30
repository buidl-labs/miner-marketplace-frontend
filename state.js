import { createGlobalState } from "react-hooks-global-state";

// const initialState = { isSignedIn: false, isClaimed: false };
// export default const { useGlobalState } = createGlobalState(initialState);

const initState = {
  ledgerAddr: "",
  isSignedIn: false,
  authMode: "",
};
// authMode: "lotus" or "ledger"
export const { useGlobalState } = createGlobalState(initState);
