import { createGlobalState } from "react-hooks-global-state";

const initState = {
  ledgerAddr: "",
  isSignedIn: false,
  authMode: "",
};
// authMode: "lotus" or "ledger"
export const { useGlobalState } = createGlobalState(initState);
