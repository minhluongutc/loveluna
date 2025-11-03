import { Routes } from '@angular/router';
import CalendarComponent from "./pages/calendar/calendar.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
  // {
    // path: '',
    // component: AppComponent,
    // children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: "calendar",
        component: CalendarComponent,
      }
    // ]
  // },

];
