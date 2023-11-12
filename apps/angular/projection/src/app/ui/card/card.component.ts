import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | null = null;
  @Input({ required: true }) addItemCallback!: () => void;
  @Input({ required: true }) deleteItemCallback!: (id: number) => void;
  @Input({ required: true }) getName!: (item: T) => string;
  @Input() customClass = '';

  addNewItem() {
    this.addItemCallback();
  }

  deleteItem = (id: number) => this.deleteItemCallback(id);
}
