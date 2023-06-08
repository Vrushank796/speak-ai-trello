import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { DisplayCardComponent } from './components/display-card/display-card.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cards',
    component: CardListComponent,
  },
  {
    path: 'card/:id',
    component: DisplayCardComponent,
  },
  {
    path: 'create-card',
    component: AddCardComponent,
  },
  {
    path: 'update-card/:id',
    component: UpdateCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
