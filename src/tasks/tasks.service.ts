import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
        ) {
        
    }
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //         );
    //     }

    //     return tasks;
    // }

    /**
     * Find a task by id
     * Respository operations are asynchronous; therefore the key 'async'
     * is used in the function's declaration.
     * and await is used to stop the execution of the function until the findOne operation
     * has finished
     * @param  {number} id 
     * @returns {Promise<Task>}
     */
    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found.`);
        }
        return found;
    }
    // gestTaskById(id: string): Task {
    //     return this.findTask(id);
    // }

    // createTask(createTaskDto: CreateTaskDto) {
    //     const {title, description} = createTaskDto;
        
    //     const task: Task = {
    //         id: uuidv1(),
    //         title, 
    //         description,
    //         status: TaskStatus.OPEN
    //     }

    //     this.tasks.push(task);
    //     // return the created task as a good practice when creating a new resource
    //     return task;
    // }

    // deleteTask(id: string): Task {
    //     const task: Task = this.findTask(id);
    //     this.tasks = this.tasks.filter(task => task.id !== id);
    //     return task; 
    // }

    // updateTask(id: string, status: TaskStatus): Task {
    //     const task = this.findTask(id);
    //     task.status = status;
    //     return task;
    // }

    // private findTask(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Task with id ${id} not found.`);
    //     }
    //     return found;
    // }
}
