import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectorCurrentTempDetState=(state:AppState)=>state.showtempdet

export const selectTempDet=createSelector(
    selectorCurrentTempDetState,
    (state)=>state.show
)

export const selectDetails=createSelector(
    selectorCurrentTempDetState,
    (state)=>state.details
)