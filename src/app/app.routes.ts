import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TesterComponent } from './tester/tester.component';




export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'weather',
        component: WeatherComponent,
    },
    // {
    //     path: 'test',
    //     component: TesterComponent,
    // },
];

@NgModule({
    imports: [RouterModule]
})
export class AppRoutingModule { }
