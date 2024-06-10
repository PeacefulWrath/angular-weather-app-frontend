import { createReducer,on } from "@ngrx/store"
import {currentcity } from "./currentCity.actions"


export interface CurrentCityState{
    city:string
}

export const initialState:CurrentCityState={
    city : ''
}

export const currentCityReducer=createReducer(
    initialState,
    on(currentcity,(state,action)=>{
        return{...state,city:action.value}
    
    }),
)