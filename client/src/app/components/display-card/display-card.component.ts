import { Component, OnInit } from '@angular/core';
import { CardService, ICard } from 'src/app/services/card/card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrls: ['./display-card.component.css'],
})
export class DisplayCardComponent implements OnInit {
  cardDetail: ICard = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
  };
  constructor(private route: ActivatedRoute, private card: CardService) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.card.getCard(id).subscribe((cardDetail) => {
      this.cardDetail = cardDetail;
    });
  }
}
