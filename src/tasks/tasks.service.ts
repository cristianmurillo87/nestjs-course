import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

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
     * Repository operations are asynchronous; therefore the key 'async'
     * is used in the function's declaration.
     * and await is used to stop the execution of the function until the findOne operation
     * has finished
     * @param  {number} id The id of the task
     * @returns {Promise<Task>} The retrieved task
     */
    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found.`);
        }
        return found;
    }

    /**
     * Creates a new task
     * @param  {CreateTaskDto} createTaskDto 
     * @returns {Promise<Task>} The created task
     */
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    /**
     * Deletes a task
     * @param  {number} id The id of the task
     */
    async deleteTask(id: number): Promise<void> {
        const deletedTask = await this.taskRepository.delete(id);
        if (deletedTask.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found.`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus) {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }


    // private findTask(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Task with id ${id} not found.`);
    //     }
    //     return found;
    // }
}
