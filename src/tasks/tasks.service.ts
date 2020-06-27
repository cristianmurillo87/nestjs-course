import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }


    gestTaskById(id: string): Task {
        return this.findTask(id);
    }

    createTask(createTaskDto: CreateTaskDto) {
        const {title, description} = createTaskDto;
        
        const task: Task = {
            id: uuidv1(),
            title, 
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        // return the created task as a good practice when creating a new resource
        return task;
    }

    deleteTask(id: string): Task {
        const task: Task = this.findTask(id);
        if (task) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            return task; 
        }
        return null;
    }

    updateTask(id: string, status: TaskStatus): Task {
        const task = this.findTask(id);
        if (task) {
            task.status = status;
        }
        return task;
    }

    private findTask(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }
}
