import { MessageNewComponent } from './message-new/message-new.component';
import { MessageListComponent } from './message-list/message-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MessageListComponent
  },
  {
    path: 'new',
    component: MessageNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
