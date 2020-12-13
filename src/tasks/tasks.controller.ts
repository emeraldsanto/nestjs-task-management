import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/task.create.dto';
import { FilterTaskDTO } from './dto/task.filter.dto';
import { PatchTaskDTO } from './dto/task.patch.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query() query?: FilterTaskDTO): ReadonlyArray<Task> {
    if (query) {
      return this.tasksService.findAllBy(query);
    }

    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task | undefined {
    const task = this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  @Post()
  create(@Body() body: CreateTaskDTO): Task {
    return this.tasksService.create(body);
  }

  @Patch(':id')
  patch(@Param('id') id: Task['id'], @Body() body: PatchTaskDTO): Task {
    const patched = this.tasksService.patch(id, body);

    if (!patched) {
      throw new NotFoundException();
    }

    return patched;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deleted = this.tasksService.remove(id);

    if (!deleted) {
      throw new NotFoundException();
    }

    return deleted;
  }
}
