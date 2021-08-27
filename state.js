import { createGlobalState } from "react-hooks-global-state";

const initState = {
  ledgerAddr: "",
  isSignedIn: false,
  authMode: "",
  activeMinersCount: 3500,
  networkStorageCapacity: "11.259 EB",
  dataStored: "2.977 PB",
  topMinerBlockRewards24H: "4797430961442729373635",
  totalBlockRewards24H: "345904011472021195844911",
  averageDealPrice: "5881975665920003",
};
// authMode: "lotus" or "ledger"
export const { useGlobalState } = createGlobalState(initState);
