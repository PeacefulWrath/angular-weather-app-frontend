import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer } from './states/user/user.reducer';
import { currentCityReducer } from './states/currentCity/currentCity,reducer';
import { showTempDetReducer } from './states/tempDet/tempDet.reducer';
import { showRainDetReducer } from './states/rainDet/rainDet.reducer';
import { showHmdDetReducer } from './states/hmdDet/hmdDet.reducer';
import { currentListReducer } from './states/list/list.reducer';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),
provideStore(),
    provideState({name:"user",reducer:userReducer}),
    provideState({name:"currentcity",reducer:currentCityReducer}),
    provideState({name:"showtempdet",reducer:showTempDetReducer}),
    provideState({name:"showraindet",reducer:showRainDetReducer}),
    provideState({name:"showhmddet",reducer:showHmdDetReducer}),
    provideState({name:"currentlist",reducer:currentListReducer})
  ]
};
