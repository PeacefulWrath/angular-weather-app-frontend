import { createAction, props } from "@ngrx/store";


export const showraindetyes=createAction("[weather component] showraindetyes",props<{value:any[]}>())

export const showraindetno=createAction("[weather component] showraindetno")