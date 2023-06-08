import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit {
  cardForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private card: CardService,
    private router: Router,
    private routeactive: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  addCard() {
    this.card
      .createCard(this.cardForm.value.title, this.cardForm.value.description)
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
