import { UserTask } from 'src/app/store/models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userTaskSort'
})
export class SortPipe implements PipeTransform {

  transform(userTasks: UserTask[], ...args: unknown[]): UserTask[] {
    return userTasks.sort(
      (a, b) => <number> new Number(a.isComplete) - <number> new Number(b.isComplete)
    );
  }

}
