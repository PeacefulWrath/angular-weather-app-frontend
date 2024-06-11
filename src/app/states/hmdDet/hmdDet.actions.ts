import { createAction, props } from "@ngrx/store";


export const showhmddetyes=createAction("[weather component] showhmddetyes",props<{value:any[]}>())

export const showhmddetno=createAction("[weather component] showhmddetno")