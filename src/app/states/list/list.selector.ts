import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectorCurrentListState=(state:AppState)=>state.currentlist

export const selectCurrentList=createSelector(
    selectorCurrentListState,
    (state)=>state.list
)