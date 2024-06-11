import { createReducer,on } from "@ngrx/store"
import {currentlist } from "./list.actions"


export interface CurrentListState{
    list:any
}

export const initialState:CurrentListState={
    list : []
}

export const currentListReducer=createReducer(
    initialState,
    on(currentlist,(state,action)=>{
        return{...state,list:action.value}
    
    }),
)