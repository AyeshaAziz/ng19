import { Component, inject } from '@angular/core';
import TodoListComponent from './todo-list/todo-list.component';
import { TodoStore } from './store/todo.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [TodoListComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  store = inject(TodoStore);
  async ngOnInit() {
    this.loadTodos().then(() => {
      console.log('Todos loaded successfully', this.store.todos());
    });
  }

  async loadTodos() {
    await this.store.loadAll();
  }

}
