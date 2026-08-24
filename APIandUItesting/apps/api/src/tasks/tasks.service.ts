import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly tasks = new Map<string, Task>(
    [
      {
        id: randomUUID(),
        title: 'Buy groceries',
        description: 'Milk, eggs, bread',
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: 'Prepare presentation',
        description: 'Slides for the Q3 review meeting',
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: 'Book dentist appointment',
        description: '',
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
      },
    ].map((task) => [task.id, task])
  );

  findAll(): Task[] {
    return Array.from(this.tasks.values());
  }

  create(input: CreateTaskDto): Task {
    const now = new Date().toISOString();
    const task: Task = {
      id: randomUUID(),
      title: input.title,
      description: input.description ?? '',
      creationDate: now,
      modificationDate: now,
    };

    this.tasks.set(task.id, task);
    return task;
  }

  findOne(id: string): Task {
    const task = this.tasks.get(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  update(id: string, input: UpdateTaskDto): Task {
    const existing = this.findOne(id);
    const updated: Task = {
      ...existing,
      title: input.title ?? existing.title,
      description: input.description ?? existing.description,
      modificationDate: new Date().toISOString(),
    };

    this.tasks.set(id, updated);
    return updated;
  }

  remove(id: string): void {
    if (!this.tasks.delete(id)) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }
}
