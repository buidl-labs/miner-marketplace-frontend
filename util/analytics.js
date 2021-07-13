// import * as fathom from "fathom-client";
export const trackGoal = (id) => {
    // typeof window != undefined &&
    window.fathom.trackGoal(id, 0);
};