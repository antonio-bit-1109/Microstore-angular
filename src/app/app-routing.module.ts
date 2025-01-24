import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { isLoggedInGuard } from './guards/login-guard.guard';
import { VoleviEhComponent } from './components/shared/volevi-eh/volevi-eh.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'voleviEh', component: VoleviEhComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home-routing.module').then(
        (module) => module.HomeRoutingModule
      ),
    canActivate: [isLoggedInGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
