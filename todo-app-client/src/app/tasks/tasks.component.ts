import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable, MatTableDataSource} from "@angular/material";
import {TasksService} from "./tasks.service";
import {DialogComponent} from "../dialog/dialog.component";
import {CreateTaskDTO} from "../../../../todo-app-server/src/tasks/dto/create-task.dto";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.less']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['name', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, private tasksService: TasksService, private apiService: ApiService) {
    this.dataSource = this.tasksService.getDataSource();
  }

  ngOnInit() {
    this.tasksService.loadTasks();
    this.listenToServer();
  }

  listenToServer() {
    this.apiService.getMessageFromServer().subscribe( result => {
      //console.log('Result from server: ' + result);
      this.tasksService.loadTasks();
    });
  }

  openDialog(action, data) {
    data.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '280px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = result.data;
        if (result.event == 'Add') {
          this.tasksService.addTask(data);
          this.apiService.sendMessageToServer('A new task was added');
        } else if (result.event == 'Update') {
          this.tasksService.updateTask(data);
          this.apiService.sendMessageToServer('A new task was updated');
        } else if (result.event == 'Delete') {
          this.tasksService.deleteTask(data._id);
          this.apiService.sendMessageToServer('A new task was deleted');
        }
      }
    });
  }
}
