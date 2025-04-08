import { Component, effect, inject, viewChild } from '@angular/core';
import { TodoFilter, TodoStore } from '../store/todo.store';
import { CommonModule } from '@angular/common';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    MatSuffix,
    MatLabel,
    MatSelectionList,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatIcon,
    MatListOption,
  ],
})
export default class TodoListComponent {
  store = inject(TodoStore);
  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }

  onFilterChange(event: MatButtonToggleChange) {
    const filter = event.value as TodoFilter;
    this.store.updateFilter(filter);
  }

  async onAddTodo(input: HTMLInputElement) {
    await this.store.addTodo(input.value);
    input.value = '';
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }
  async onToggleTodo(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
  }
}
