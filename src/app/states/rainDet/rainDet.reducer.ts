import { createReducer, on } from "@ngrx/store"
import { showraindetno, showraindetyes } from "./rainDet.actions"


export interface ShowRainDetState {
    show: string,
    details:any
}

export const initialState: ShowRainDetState = {
    show: "no",
    details:[]
}

export const showRainDetReducer = createReducer(
    initialState,
    on(showraindetyes, (state,action) => { return{...state, show:"yes", details:action.value}}),
    on(showraindetno, state => ({ ...state, show: "no" }))
    )
