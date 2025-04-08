import { Injectable } from '@angular/core';
import { TODOS } from '../models/mock-data';
import { TodoItem } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  async getTodos() {
    await this.sleep(1000); // Simulate a network delay
    return TODOS;
  }

  async addTodo(todo: Partial<TodoItem>): Promise<TodoItem> {
    await this.sleep(1000); // Simulate a network delay
    return { ...todo, id: Math.random().toString() } as TodoItem;
  }

  async deleteTodo(id: string): Promise<void> {
    await this.sleep(500); // Simulate a network delay
  }

  async updateTodo(id: string, completed: boolean): Promise<void> {
  await this.sleep(500); // Simulate a network delay
  }
    
  // Simulate a delay for the async operation
  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
