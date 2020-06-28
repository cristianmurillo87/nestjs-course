import { Controller, Get, Post, Body, Param, Delete, Patch, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // ValidationPipe  must be declared as an argument of @Query
    // allows the function to validate the parameters
    // of filterDto based on the DTOs argument decorators
    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.gestTaskById(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // @Patch('/:id/status')
    // updateTask(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    // ): Task {
    //     return this.tasksService.updateTask(id, status);
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string) {
    //     return this.tasksService.deleteTask(id);
    // }
}
