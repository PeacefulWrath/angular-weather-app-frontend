import { createAction, props } from "@ngrx/store";


export const currentlist=createAction("currentlist",props<{value:string}>())

