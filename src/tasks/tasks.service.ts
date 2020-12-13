import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDTO } from './dto/task.create.dto';
import { PatchTaskDTO } from './dto/task.patch.dto';
import { FilterTaskDTO } from './dto/task.filter.dto';

@Injectable()
export class TasksService {
  private tasks: ReadonlyArray<Task> = [];

  findAll(): ReadonlyArray<Task> {
    return this.tasks;
  }

  findAllBy(filters: FilterTaskDTO): ReadonlyArray<Task> {
    const { status, query } = filters;

    return this.tasks
      .filter((t) => {
        if (!status) {
          return true;
        }

        return t.status === status;
      })
      .filter((t) => {
        if (!query) {
          return true;
        }

        return [t.title, t.description].some((text) => text.includes(query));
      });
  }

  findOne(id: Task['id']): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  create(task: CreateTaskDTO): Task {
    const defaultTask: Task = {
      ...task,
      id: uuid.v4(),
      status: 'open',
    };

    this.tasks = [...this.tasks, defaultTask];
    return defaultTask;
  }

  patch(id: Task['id'], patches: PatchTaskDTO): Task | undefined {
    const toPatchIndex = this.tasks.findIndex((t) => t.id === id);

    if (toPatchIndex === -1) {
      return;
    }

    const patched = {
      ...this.tasks[toPatchIndex],
      ...patches,
    };

    this.tasks = [
      ...this.tasks.slice(0, toPatchIndex),
      patched,
      ...this.tasks.slice(toPatchIndex, this.tasks.length - 1),
    ];

    return patched;
  }

  remove(id: Task['id']): Task | undefined {
    const toDeleteIndex = this.tasks.findIndex((t) => t.id === id);

    if (toDeleteIndex === -1) {
      return;
    }

    const deleted = this.tasks[toDeleteIndex];
    const updated = [...this.tasks];

    updated.splice(toDeleteIndex, 1);
    this.tasks = updated;

    return deleted;
  }
}
