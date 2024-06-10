import { createReducer,on } from "@ngrx/store"
import {updateuserdetails } from "./user.actions"


export interface UserState{
    name : string,
    email:string,
    city:string
}

export const initialState:UserState={
    name : '',
    email:'',
    city:''
}

export const userReducer=createReducer(
    initialState,
    on(updateuserdetails,(state,action)=>{
        return{...state,name:action.name,email:action.email,city:action.city}
    
    }),
)