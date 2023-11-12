import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students"
    [addItemCallback]="addNewItem"
    [deleteItemCallback]="deleteItem"
    [getName]="getName"
    customClass="bg-light-green">
    <img src="assets/img/student.webp" width="200px" />
  </app-card>`,
  standalone: true,
  styles: [],
  imports: [CardComponent, NgIf],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  protected addNewItem = () => this.store.addOne(randStudent());

  protected deleteItem = (id: number) => this.store.deleteOne(id);

  protected getName = (item: Student) => item.firstname;
}
