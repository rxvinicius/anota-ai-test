import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CardListComponent } from './components/card-list/card-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardListComponent],
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
