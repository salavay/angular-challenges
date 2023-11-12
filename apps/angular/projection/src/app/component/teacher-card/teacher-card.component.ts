import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card
    [list]="teachers"
    [addItemCallback]="addNewItem"
    [deleteItemCallback]="deleteItem"
    [getName]="getName"
    customClass="bg-light-red">
    <img src="assets/img/teacher.png" width="200px" />
  </app-card>`,
  styles: [],
  standalone: true,
  imports: [CardComponent, NgIf],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  protected addNewItem = () => this.store.addOne(randTeacher());

  protected deleteItem = (id: number) => this.store.deleteOne(id);

  protected getName = (item: Teacher) => item.firstname;
}
