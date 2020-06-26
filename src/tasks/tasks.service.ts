import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v1 as uuidv1 } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string) {
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
}
