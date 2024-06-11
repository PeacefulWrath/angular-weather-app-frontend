import { createAction, props } from "@ngrx/store";


export const showtempdetyes=createAction("[weather component] showtempdetyes",props<{value:any[]}>())

export const showtempdetno=createAction("[weather component] showtempdetno")