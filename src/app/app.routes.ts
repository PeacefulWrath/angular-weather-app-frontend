import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';




export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'weather',
        component: WeatherComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
