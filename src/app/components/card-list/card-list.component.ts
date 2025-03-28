import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];
  filteredCards: Card[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  private searchSubject = new Subject<string>();

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.loadCards();

    this.searchSubject
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.filterCards();
      });
  }

  loadCards(): void {
    this.isLoading = true;
    this.cardService.getCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.filteredCards = [...this.cards];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onSearchInput(event: any): void {
    this.isLoading = true;
    this.searchSubject.next(event.target.value);
  }

  filterCards(): void {
    if (!this.searchTerm) {
      this.filteredCards = [...this.cards];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCards = this.cards.filter(
        (card) =>
          card.title.toLowerCase().includes(term) ||
          card.description.toLowerCase().includes(term)
      );
    }
    this.isLoading = false;
  }

  onDeleteCard(id: number): void {
    this.cards = this.cards.filter((card) => card.id !== id);
    this.filterCards();
  }
}
