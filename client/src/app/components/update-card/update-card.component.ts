import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService, ICard } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.css'],
})
export class UpdateCardComponent implements OnInit {
  cardDetail: ICard = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
  };

  cardForm = new FormGroup({
    title: new FormControl(this.cardDetail.title, Validators.required),
    description: new FormControl(
      this.cardDetail.description,
      Validators.required
    ),
  });

  constructor(
    private card: CardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  id: string = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.card.getCard(this.id).subscribe((cardDetail) => {
      this.cardDetail = cardDetail;
    });
  }

  editCard() {
    this.card
      .updateCard(
        this.id,
        this.cardForm.value.title,
        this.cardForm.value.description
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/cards']);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }
}
