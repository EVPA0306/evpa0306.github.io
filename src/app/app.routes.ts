import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { CoachesComponent } from './pages/coaches/coaches.component';
import { MediaComponent } from './pages/media/media.component';
import { TermsComponent } from './pages/terms/terms.component';
import {PricingComponent} from './pages/pricing/pricing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'coaches', component: CoachesComponent },
  { path: 'media', component: MediaComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', redirectTo: '' }
];
