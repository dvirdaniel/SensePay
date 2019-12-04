import {Documnet} from 'mongoose';

export interface Task extends Documnet {
    readonly name: string
    readonly isDone: boolean;
}
