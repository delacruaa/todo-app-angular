import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/models/ITodo';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  public inputText: string = '';
  public todos: ITodo[] = [];
  public errorMessage = '';
  constructor(private todosService: TodosService) {}
  ngOnInit(): void {
    this.todosService.getTodoList().subscribe((data) => {
      this.todos = data;
    });
  }

  clearError() {
    this.errorMessage = '';
  }
  addTask() {
    if (this.inputText !== '') {
      let todo = {
        id: Math.random().toString(),
        description: this.inputText,
        isCompleted: false,
      };
      this.inputText = '';
      this.todosService.todos.next([...this.todos, todo]);
    } else {
      this.errorMessage = 'Not be empty';
    }
  }
}
