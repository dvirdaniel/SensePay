import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Res
} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDTO} from "./dto/create-task.dto";
import {ValidateObjectId} from "../shared/pipes/validate-object-id.pipe";

@Controller('tasks')
export class TasksController {

    constructor(private tasksSvc: TasksService) {}

    @Get()
    async getTasks(@Res() res) {
        const tasks = await this.tasksSvc.getTasks();
        return res.status(HttpStatus.OK).json(tasks);
    }

    @Get(':taskID')
    async getTask(@Res() res, @Param('taskID', new ValidateObjectId()) taskID) {
        const task = await this.tasksSvc.getTask(taskID);
        if (!task) {
            throw new NotFoundException('Task does not exist!');
        }
        return res.status(HttpStatus.OK).json(task);
    }

    @Post()
    async addTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO) {
        const addedTask = await this.tasksSvc.addTask(createTaskDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Task has been successfully added!',
            task: addedTask
        });
    }

    @Put()
    async updateTask(@Res() res, @Query('taskId', new ValidateObjectId()) taskID, @Body() createTaskDTO: CreateTaskDTO) {
        const task = await this.tasksSvc.updateTask(taskID, createTaskDTO);
        if (!task) {
            throw new NotFoundException('Task does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Task has been successfully updated!',
            task: task
        });
    }

    @Delete()
    async deleteTask(@Res() res, @Query('taskId', new ValidateObjectId()) taskID) {
        const task = await this.tasksSvc.deleteTask(taskID);
        if (!task) {
            throw new NotFoundException('Task does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Task has been successfully deleted!',
            task: task
        });
    }
}
