import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectorCurrentCityState=(state:AppState)=>state.currentcity

export const selectCurrentCity=createSelector(
    selectorCurrentCityState,
    (state)=>state.city
)