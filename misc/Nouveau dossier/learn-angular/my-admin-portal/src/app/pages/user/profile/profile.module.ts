import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCalendarComponent } from './components/calendars/user-calendar/user-calendar.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

import { ProfilePageComponent } from './containers/profile-page';
import { StoreModule } from '@ngrx/store';
import * as fromUserTask from '../../../store/reducers/user-task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserTaskEffects } from '../../../store/effects/user-task.effects';

import { HttpClientModule } from '@angular/common/http';
import { UpdateUserTaskComponent } from './components/todo/crud/update-user-task/update-user-task.component';
import { UserTaskActionsMenuComponent, UserTasksComponent } from './components/todo';
import { AddUserTaskComponent } from './components/todo/crud/add-user-task/add-user-task.component';
import { UserTaskAddActionComponent } from './components/todo/user-task-add-action/user-task-add-action.component';
import { SortPipe } from './pipes/user-task.sort.pipe';
import { UserTasksFilterActionComponent } from './components/todo/user-tasks-filter-action/user-tasks-filter-action.component';
import { UserInfoComponent } from './components/info/user-info/user-info.component';

import { UserTaskService } from './services/user-task.service';
import { UserInfoService } from './services';
import * as fromUserInfo from '../../../store/reducers/user-info.reducer';
import { UserInfoEffects } from '../../../store/effects/user-info.effects';

@NgModule({
  declarations: [
    ProfilePageComponent,
    UserTasksComponent,
    UserTaskActionsMenuComponent,
    UpdateUserTaskComponent,
    AddUserTaskComponent,
    UserTaskAddActionComponent,
    SortPipe,
    UserTasksFilterActionComponent,
    UserInfoComponent,
    UserCalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    StoreModule.forFeature(fromUserTask.userTasksFeatureKey, fromUserTask.userTaskReducer),
    EffectsModule.forFeature([UserTaskEffects, UserInfoEffects]),
    StoreModule.forFeature(fromUserInfo.userInfoFeatureKey, fromUserInfo.userInfoReducer)
  ],
  exports: [
    UserTasksComponent
  ],
  providers: [
    UserTaskService,
    UserInfoService
  ]
})
export class ProfileModule { }
