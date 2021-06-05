import { createGlobalState } from "react-hooks-global-state";

// const initialState = { isSignedIn: false, isClaimed: false };
// export default const { useGlobalState } = createGlobalState(initialState);

const initState = {
  ledgerAddr: "",
  isSignedIn: false,
};

export const { useGlobalState } = createGlobalState(initState);
