import { CurrentCityState } from "./currentCity/currentCity,reducer";
import { ShowHmdDetState } from "./hmdDet/hmdDet.reducer";
import { CurrentListState } from "./list/list.reducer";
import { ShowRainDetState } from "./rainDet/rainDet.reducer";
import { ShowTempDetState } from "./tempDet/tempDet.reducer";
import { UserState } from "./user/user.reducer";

export interface AppState{
    user:UserState,
    currentcity:CurrentCityState,
    showtempdet:ShowTempDetState,
    showraindet:ShowRainDetState,
    showhmddet:ShowHmdDetState,
    currentlist:CurrentListState
}