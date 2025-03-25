import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../models/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;
  @Output() delete = new EventEmitter<number>();

  getTypeName(): string {
    switch (this.card.type) {
      case '1':
        return 'Paisagem';
      case '2':
        return 'Flor';
      case '3':
        return 'Pizza';
      default:
        return 'Desconhecido';
    }
  }

  getTypeClass(): string {
    return `type-${this.card.type}`;
  }

  onDelete() {
    this.delete.emit(this.card.id);
  }
}
