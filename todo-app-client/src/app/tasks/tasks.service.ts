import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material";
import {environment} from "../../environments/environment";

const BASE_API_URL = '/api/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private dataSource = new MatTableDataSource([]);

  constructor(private http: HttpClient) { }

  getDataSource() {
    return this.dataSource;
  }

  loadTasks() {
    this.http.get<any>(BASE_API_URL).subscribe(
        data => {
                this.dataSource.data = data;
      },
        error => console.log('Could not load tasks.'));
  }

  public getTask(taskId): void {
    this.http.get<any>(BASE_API_URL+'?taskId='+taskId).subscribe(data => {
      let notFound = true;

      this.dataSource.data.forEach((t, i) => {
        if (t._id === data._id) {
          this.dataSource.data[i] = data;
          this.dataSource._updateChangeSubscription();
          notFound = false;
        }
      });

      if (notFound) {
        this.dataSource.data.push(data);
        this.dataSource._updateChangeSubscription();
      }
    }, error => console.log('Could not load task.'));

  }

  public addTask(task): void {
      this.http.post<any>(BASE_API_URL, task).subscribe(data => {
        this.dataSource.data.push(data.task);
        this.dataSource._updateChangeSubscription();
      }, error => console.log('Could not add task!'));
  }

  public updateTask(task): any {
    let taskId = task._id;
    this.http.put<any>(BASE_API_URL+'?taskId='+taskId, task).subscribe(response => {
      this.dataSource.data.forEach((t, i) => {
        let data = response.task;
        if (t._id === taskId) {
          this.dataSource.data[i] = data;
          this.dataSource._updateChangeSubscription();
        }
      });
    }, error => console.log('Could not update task!'));
  }

  public deleteTask(taskId): void {
    this.http.delete(BASE_API_URL+'?taskId='+taskId).subscribe(response => {
      this.dataSource.data.forEach((t, i) => {
        if (t._id === taskId) {
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
        }
      });
    }, error => console.log('Could not delete task!'));
  }
}
