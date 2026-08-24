import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import type { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';
import { TaskApiService } from '../services/task-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  errorMessage = '';

  newTitle = '';
  newDescription = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly taskApi: TaskApiService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';
    this.taskApi.list().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load tasks. Is the API running?';
        this.loading = false;
      },
    });
  }

  addTask(): void {
    if (!this.newTitle.trim()) {
      return;
    }

    this.taskApi.create({ title: this.newTitle, description: this.newDescription }).subscribe({
      next: (task) => {
        this.tasks = [...this.tasks, task];
        this.newTitle = '';
        this.newDescription = '';
      },
      error: () => {
        this.errorMessage = 'Failed to create task.';
      },
    });
  }

  updateTask(task: Task): void {
    this.taskApi.update(task.id, { title: task.title, description: task.description }).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          this.tasks[index] = updated;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to update task.';
      },
    });
  }

  deleteTask(id: string): void {
    this.taskApi.delete(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== id);
      },
      error: () => {
        this.errorMessage = 'Failed to delete task.';
      },
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
