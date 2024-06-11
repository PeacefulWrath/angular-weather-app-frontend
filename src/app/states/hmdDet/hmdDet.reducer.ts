import { createReducer, on } from "@ngrx/store"
import { showhmddetno, showhmddetyes } from "./hmdDet.actions"


export interface ShowHmdDetState {
    show: string,
    details:any
}

export const initialState: ShowHmdDetState = {
    show: "no",
    details:[]
}

export const showHmdDetReducer = createReducer(
    initialState,
    on(showhmddetyes, (state,action) => { return{...state, show:"yes", details:action.value}}),
    on(showhmddetno, state => ({ ...state, show: "no" }))
    )
