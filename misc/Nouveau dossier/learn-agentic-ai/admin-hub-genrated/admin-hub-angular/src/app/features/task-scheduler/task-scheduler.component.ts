import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.scss']
})
export class TaskSchedulerComponent implements OnInit {
  taskForm: FormGroup;
  tasks: Task[] = [
    { id: 1, name: 'Sample Task 1', description: 'This is a sample task', date: '2025-05-27T10:00' },
    { id: 2, name: 'Sample Task 2', description: 'This is another sample task', date: '2025-05-28T14:30' }
  ];

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        ...this.taskForm.value
      };

      this.tasks.push(newTask);
      this.taskForm.reset();
    }
  }

  editTask(task: Task): void {
    // Populate the form with task data for editing
    this.taskForm.patchValue(task);
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
