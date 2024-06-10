import { createAction, props } from "@ngrx/store";


export const updateuserdetails=createAction("updateuserdetails",props<{name:string,email:string, city:string}>())

