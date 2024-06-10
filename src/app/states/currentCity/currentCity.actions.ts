import { createAction, props } from "@ngrx/store";


export const currentcity=createAction("currentcity",props<{value:string}>())

