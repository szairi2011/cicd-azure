// frontend/src/app/components/task-detail/task-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  template: `
    <div class="task-detail-container" *ngIf="task">
      <div class="header">
        <button class="back-btn" (click)="goBack()">← Back</button>
        <h2>{{ isNewTask ? 'Create Task' : 'Edit Task' }}</h2>
        <div class="actions">
          <button class="delete-btn" *ngIf="!isNewTask" (click)="deleteTask()">Delete</button>
          <button class="save-btn" (click)="saveTask()">Save</button>
        </div>
      </div>
      
      <form [formGroup]="taskForm" class="task-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" formControlName="title" class="form-control">
          <div class="error" *ngIf="taskForm.get('title')?.invalid && taskForm.get('title')?.touched">
            Title is required
          </div>
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" formControlName="description" class="form-control"></textarea>
        </div>
        
        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" formControlName="category" class="form-control">
            <option value="">Select Category</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Meetings">Meetings</option>
            <option value="Planning">Planning</option>
            <option value="Office">Office</option>
            <option value="Strategy">Strategy</option>
            <option value="Content">Content</option>
            <option value="Audio">Audio</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="dueDate">Due Date</label>
          <input type="datetime-local" id="dueDate" formControlName="dueDate" class="form-control">
        </div>
        
        <div class="form-group">
          <label for="assignee">Assignee</label>
          <select id="assignee" formControlName="assigneeId" class="form-control">
            <option value="">Select Assignee</option>
            <option [value]="1">John Doe</option>
            <option [value]="2">Jane Smith</option>
            <option [value]="3">Robert Brown</option>
            <option [value]="4">Emily Davis</option>
          </select>
        </div>
        
        <div class="form-group checkbox">
          <label>
            <input type="checkbox" formControlName="completed">
            Mark as completed
          </label>
        </div>
      </form>
    </div>
  `,
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

// frontend/src/app/components/task-detail/task-detail.component.scss
.task-detail-container {
  background-color: var(--card-background);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 22px;
    font-weight: 500;
  }
  
  .back-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-color);
    font-size: 16px;
  }
  
  .actions {
    display: flex;
    gap: 10px;
    
    button {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      
      &.delete-btn {
        background-color: #f8d7da;
        color: #721c24;
      }
      
      &.save-btn {
        background-color: var(--accent-color);
        color: #333;
      }
    }
  }
}

.task-form {
  .form-group {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: var(--secondary-color);
    }
    
    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: inherit;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: var(--accent-color);
      }
    }
    
    textarea.form-control {
      min-height: 100px;
      resize: vertical;
    }
    
    &.checkbox {
      display: flex;
      align-items: center;
      
      label {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
      }
    }
    
    .error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
