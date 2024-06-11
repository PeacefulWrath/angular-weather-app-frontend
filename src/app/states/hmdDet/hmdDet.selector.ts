import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectorCurrentHmdDetState=(state:AppState)=>state.showhmddet

export const selectHmdDet=createSelector(
    selectorCurrentHmdDetState,
    (state)=>state.show
)

export const selectDetails=createSelector(
    selectorCurrentHmdDetState,
    (state)=>state.details
)