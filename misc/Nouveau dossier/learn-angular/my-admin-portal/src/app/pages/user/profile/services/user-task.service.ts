import { Update } from '@ngrx/entity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserTask } from 'src/app/store/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {

  user_task_api_url = environment.user_task_api_url;

  constructor(private http: HttpClient) { }

  loadUserTasks(): Observable<UserTask[]> {
    return this.http.get<UserTask[]>(this.user_task_api_url);
  }

  updateUserTask(data: Update<UserTask> ): Observable<any> {
    return this.http.patch(this.user_task_api_url + data.id, data.changes);
  }

  deleteUserTask(_id: string ): Observable<any> {
    return this.http.delete(this.user_task_api_url + _id);
  }

  addUserTask(_task: UserTask ): Observable<any> {
    return this.http.post(this.user_task_api_url, _task);
  }
}
