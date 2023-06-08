import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';
import { DisplayCardComponent } from './components/display-card/display-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CardComponent,
    HeaderComponent,
    CardListComponent,
    AddCardComponent,
    UpdateCardComponent,
    DisplayCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
