import { Injectable } from '@angular/core';
import { ITodo } from '../models/ITodo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  public todos = new BehaviorSubject<ITodo[]>([
    {
      id: Math.random().toString(),
      description: 'Complete online JavaScript course',
      isCompleted: true,
    },
    {
      id: Math.random().toString(),
      description: 'Jog around the park 3x',
      isCompleted: false,
    },
    {
      id: Math.random().toString(),
      description: '10 minutes meditation',
      isCompleted: false,
    },
    {
      id: Math.random().toString(),
      description: 'Read for 1 hour',
      isCompleted: false,
    },
    {
      id: Math.random().toString(),
      description: 'Pick up groceries',
      isCompleted: false,
    },
    {
      id: Math.random().toString(),
      description: 'Complete Todo App on Frontend Mentor',
      isCompleted: false,
    },
  ]);

  getTodoList() {
    return this.todos.asObservable();
  }
}
