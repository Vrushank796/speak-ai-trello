import { Component, OnInit } from '@angular/core';
import { CardService, ICard } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  cards: ICard[] = [];
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getCards().subscribe((cards) => {
      this.cards = cards;
    });
  }
}
