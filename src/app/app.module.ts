//moduli
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';

//componenti
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { CardComponent } from './components/shared/card/card.component';
import { GestioneOrdiniComponent } from './components/gestione-ordini/gestione-ordini.component';
import { HomeContainerComponent } from './components/home-container/home-container.component';
import { DettaglioProdottoComponent } from './components/prodotti/dettaglio-prodotto/dettaglio-prodotto.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { FiltroRicercaComponent } from './components/shared/filtro-ricerca/filtro-ricerca.component';
import { ToastModule } from 'primeng/toast';
import { VoleviEhComponent } from './components/shared/volevi-eh/volevi-eh.component';
import { ModaleComponent } from './components/shared/modale/modale.component';
import { InserisciNuovoProdottoComponent } from './components/inserisci-nuovo-prodotto/inserisci-nuovo-prodotto.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AggiungiScorteProdottoComponent } from './components/shared/modale/innerModaleComponents/aggiungi-scorte-prodotto/aggiungi-scorte-prodotto.component';
import { UserComponent } from './components/user/user.component';
import { GeneralModalComponent } from './components/general-modal/general-modal.component';
import { ContatoreKcalComponent } from './components/contatore-kcal/contatore-kcal.component';
import { CancellaProdottoComponent } from './components/cancella-prodotto-soft/cancella-prodotto-soft.component';
import { MessageService } from 'primeng/api';
import { ModaleFeatureCarrelloComponent } from './modale-feature-carrello/modale-feature-carrello.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    CarouselComponent,
    FooterComponent,
    ProdottiComponent,
    CardComponent,
    GestioneOrdiniComponent,
    HomeContainerComponent,
    DettaglioProdottoComponent,
    RegistrazioneComponent,
    FiltroRicercaComponent,
    VoleviEhComponent,
    ModaleComponent,
    InserisciNuovoProdottoComponent,
    AggiungiScorteProdottoComponent,
    UserComponent,
    GeneralModalComponent,
    ContatoreKcalComponent,
    CancellaProdottoComponent,
    ModaleFeatureCarrelloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    DividerModule,
    ButtonModule,
    CarouselModule,
    HttpClientModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    DropdownModule,
    ToastModule,
    PaginatorModule,
    DialogModule,
    FloatLabelModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
