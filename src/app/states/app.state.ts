import { CurrentCityState } from "./currentCity/currentCity,reducer";
import { UserState } from "./user/user.reducer";

export interface AppState{
    user:UserState,
    currentcity:CurrentCityState
}