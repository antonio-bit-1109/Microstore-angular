import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProdottiComponent } from '../prodotti/prodotti.component';
import { GestioneOrdiniComponent } from '../gestione-ordini/gestione-ordini.component';
import { HomeContainerComponent } from '../home-container/home-container.component';
import { DettaglioProdottoComponent } from '../prodotti/dettaglio-prodotto/dettaglio-prodotto.component';
import { RegistrazioneComponent } from '../registrazione/registrazione.component';
import { UserComponent } from '../user/user.component';
import { CarrelloCorrenteComponent } from '../carrello-corrente/carrello-corrente.component';
import { enterCarrelloCorrenteGuard } from '../../guards/enter-carrello-corrente.guard';
import { GestioneCarrelliComponent } from '../gestione-carrelli/gestione-carrelli.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeContainerComponent },
      { path: 'prodotti', component: ProdottiComponent }, // Aggiungi la nuova rotta
      {
        path: 'dettaglioProdotto/:id/:from',
        component: DettaglioProdottoComponent,
      },
      { path: 'gestioneOrdini', component: GestioneOrdiniComponent },
      { path: 'profilo', component: UserComponent },
      {
        path: 'carrello-corrente',
        component: CarrelloCorrenteComponent,
        canActivate: [enterCarrelloCorrenteGuard],
      },
      { path: 'gestione-carrelli', component: GestioneCarrelliComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
