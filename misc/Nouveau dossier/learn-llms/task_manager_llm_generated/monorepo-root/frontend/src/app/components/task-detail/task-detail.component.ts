import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task?: Task;
  taskForm!: FormGroup;
  isNewTask = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.createForm();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isNewTask = true;
      this.task = {
        id: 0,
        title: '',
        description: '',
        completed: false
      };
    } else if (id) {
      this.loadTask(+id);
    }
  }
  
  createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: [''],
      dueDate: [null],
      assigneeId: [null],
      completed: [false]
    });
  }
  
  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe(task => {
      this.task = task;
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        category: task.category,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : null,
        assigneeId: task.assignee?.id,
        completed: task.completed
      });
    });
  }
  
  saveTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    
    const formValue = this.taskForm.value;
    
    const updatedTask: Task = {
      ...this.task!,
      title: formValue.title,
      description: formValue.description,
      category: formValue.category,
      completed: formValue.completed,
      dueDate: formValue.dueDate ? new Date(formValue.dueDate) : undefined,
      assignee: formValue.assigneeId ? { id: formValue.assigneeId, name: '' } : undefined
    };
    
    if (this.isNewTask) {
      this.taskService.createTask(updatedTask).subscribe(() => {
        this.goBack();
      });
    } else {
      this.taskService.updateTask(this.task!.id, updatedTask).subscribe(() => {
        this.goBack();
      });
    }
  }
  
  deleteTask(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task!.id).subscribe(() => {
        this.goBack();
      });
    }
  }
  
  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
