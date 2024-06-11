import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectorCurrentRainDetState=(state:AppState)=>state.showraindet

export const selectRainDet=createSelector(
    selectorCurrentRainDetState,
    (state)=>state.show
)

export const selectDetails=createSelector(
    selectorCurrentRainDetState,
    (state)=>state.details
)