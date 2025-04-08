import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { TodoItem } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { inject } from '@angular/core';
import { computed } from '@angular/core';

export type TodoFilter = 'all' | 'pending' | 'completed';

type TodoState = {
  todos: TodoItem[];
  loading: boolean;
  filter: TodoFilter;
  loaded: boolean;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  filter: 'all',
  loaded: false,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    async loadAll() {
      patchState(store, { loading: true });
      const todos = await todoService.getTodos();
      patchState(store, { loading: false, todos, loaded: true });
    },
    async addTodo(title: string) {
      const todo = await todoService.addTodo({ title, completed: false });
      patchState(store, (state) => ({
        todos: [...state.todos, todo],
      }));
    },
    async deleteTodo(id: string) {
      await todoService.deleteTodo(id);
      patchState(store, (state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
    async updateTodo(id: string, completed: boolean) {
      console.log('onToggleTodo', id, completed);
      await todoService.updateTodo(id, completed);
      patchState(store, (state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        ),
      }));
    },
    updateFilter(filter: TodoFilter) {
      patchState(store, { filter });
    },
  })),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos() as TodoItem[];
      switch (state.filter()) {
        case 'all':
          return todos;
        case 'pending':
          return todos.filter((todo) => !todo.completed);
        case 'completed':
          return todos.filter((todo) => todo.completed);
      }
    }),
  }))
) ;
