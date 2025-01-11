import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { CardComponent } from './components/shared/card/card.component';
import { DettaglioProdottoComponent } from './components/prodotti/dettaglio-prodotto/dettaglio-prodotto.component';

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
    DettaglioProdottoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    DividerModule,
    ButtonModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
