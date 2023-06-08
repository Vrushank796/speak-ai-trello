import { Component, OnInit, Input } from '@angular/core';
import { CardService, ICard } from 'src/app/services/card/card.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() card = <ICard>{};
  constructor(
    private cardService: CardService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  displayCard() {
    this.router.navigate(['/card/' + this.card.id]);
  }

  updateCard(id: string) {
    this.router.navigate(['/update-card/' + this.card.id]);
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id).subscribe((response) => {
      if (response.deletedCount == 1) {
        this.router.navigate(['/cards']).then(() => {
          window.location.reload();
        });
      } else {
        window.alert('Some error occured while deleting card' + response);
      }
    });
  }
}
