import { createReducer, on } from "@ngrx/store"
import { showtempdetno, showtempdetyes } from "./tempDet.actions"


export interface ShowTempDetState {
    show: string,
    details:any
}

export const initialState: ShowTempDetState = {
    show: "no",
    details:[]
}

export const showTempDetReducer = createReducer(
    initialState,
    on(showtempdetyes, (state,action) => { return{...state, show:"yes", details:action.value}}),
    on(showtempdetno, state => ({ ...state, show: "no" }))
    )
