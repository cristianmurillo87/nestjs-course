import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
        ) {
        
    }

    /**
     * Find tasks based on a search term
     * @param  {GetTasksFilterDto} filterDto {status?: TaskStatus, search?: string} 
     * @returns {Promise<Task[]>} The retrieved tasks
     */
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

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
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
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

    /**
     * Updates the status of a task
     * @param  {number} id The id of the task
     * @param {TaskStatus} status The new status for the task
     * @returns {Promise<Task>} Promise holding the updated tasks 
     */
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

}
