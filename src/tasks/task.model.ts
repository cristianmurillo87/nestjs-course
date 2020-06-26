export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

// Created to allow only certain values for the status property
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}