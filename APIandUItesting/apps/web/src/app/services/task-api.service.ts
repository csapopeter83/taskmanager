import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { CreateTaskInput, Task, UpdateTaskInput } from '../models/task.model';
import { API_BASE_URL } from './api-base-url';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(`${API_BASE_URL}/tasks`);
  }

  create(input: CreateTaskInput): Observable<Task> {
    return this.http.post<Task>(`${API_BASE_URL}/tasks`, input);
  }

  update(id: string, input: UpdateTaskInput): Observable<Task> {
    return this.http.put<Task>(`${API_BASE_URL}/tasks/${id}`, input);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/tasks/${id}`);
  }
}
