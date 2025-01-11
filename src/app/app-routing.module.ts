import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home-routing.module').then(
        (module) => module.HomeRoutingModule
      ),
  },
  { path: 'prodotti', component: ProdottiComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
