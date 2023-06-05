import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/models/ITodo';
import { TodosService } from 'src/app/services/todos.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todos: ITodo[] = [
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
  ];
  public filteredTasks: ITodo[] = [];
  public tabs: string[] = ['All', 'Active', 'Completed'];
  public currentTab = 'All';
  public isEmpty = false;
  constructor(private todosService: TodosService) {}
  ngOnInit(): void {
    this.todosService.getTodoList().subscribe((data) => {
      this.filteredTasks = data;
      this.todos = data;
      this.isEmpty = false;
    });
  }
  onDrop(event: CdkDragDrop<ITodo[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
  deleteTask(id: string) {
    this.todos = this.todos.filter((item) => item.id !== id);
    this.todosService.todos.next(this.todos);
  }

  completedTask(id: string) {
    this.todos = this.todos.map((item) => {
      if (item.id == id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    this.todosService.todos.next(this.todos);
  }

  clearAllCompleted() {
    this.todos = this.todos.filter((item) => !item.isCompleted);
    this.todosService.todos.next(this.todos);
    this.currentTab = 'All';
  }

  changeTab(tab: string) {
    if (tab === 'All') {
      this.filteredTasks = this.todos;
      if (this.filteredTasks.length == 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    } else if (tab === 'Completed') {
      this.filteredTasks = this.todos.filter((task) => task.isCompleted);
      if (this.filteredTasks.length == 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    } else if (tab === 'Active') {
      this.filteredTasks = this.todos.filter((task) => !task.isCompleted);
      if (this.filteredTasks.length == 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    }
    this.currentTab = tab;
  }
}
