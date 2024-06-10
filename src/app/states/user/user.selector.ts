import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectorUserState=(state:AppState)=>state.user

export const selectName=createSelector(
    selectorUserState,
    (state)=>state.name
)

export const selectEmail=createSelector(
    selectorUserState,
    (state)=>state.email
)

export const selectCity=createSelector(
    selectorUserState,
    (state)=>state.city
)