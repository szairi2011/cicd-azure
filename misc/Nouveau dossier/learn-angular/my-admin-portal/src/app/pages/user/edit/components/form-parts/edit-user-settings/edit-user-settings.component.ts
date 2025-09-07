import { channels } from 'src/app/consts';
import { selectLoggedInUserInfo } from 'src/app/store/selectors';
import { updateUserInfo } from 'src/app/store/actions';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { UserInfo } from 'src/app/store/models';
import { AppState } from 'src/app/store';
import { user_roles } from 'src/app/pages/user/common';

@Component({
  selector: 'app-edit-user-settings',
  templateUrl: './edit-user-settings.component.html',
  styleUrls: ['./edit-user-settings.component.scss']
})
export class EditUserSettingsComponent implements OnInit {

  @Input() data?: any;

  user: UserInfo;

  editSettingsForm: FormGroup;

  userRoles = user_roles;

  selectedRole: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.select(selectLoggedInUserInfo).subscribe(
      usr => {
        this.user = usr;
        this.setSelectedRole();
        this.setCommChannels();
      }
    );

    this.editSettingsForm = this.fb.group({
      role: [this.user.role],
      email_channel: this.user.com_channels?.indexOf(channels.EMAIL) > -1 ? true:false,
      message_channel: this.user.com_channels?.indexOf(channels.MESSAGES) > -1 ? true:false,
      phone_channel: this.user.com_channels?.indexOf(channels.PHONE) > -1 ? true:false,
      notify: this.user.notify
    });

  }

  updateSettings() {

    console.log('Updating user settings ...: ', this.editSettingsForm.controls.role.value);

    const comm_channels = this.getCommunicationChannels();

    console.log("Saving user communication settings: " + comm_channels);

    const toUpdate: Update<UserInfo> = {
      id: this.user.id,
      changes: {
        role: this.editSettingsForm.controls.role.value,
        com_channels: comm_channels,
        notify: this.editSettingsForm.controls.notify.value
      }
    }

    this.store.dispatch(updateUserInfo({ userInfo: toUpdate }));

    // const subs = this.store.subscribe(() => this.store.dispatch(updateUserInfo({ userInfo: toUpdate })));
    // subs.unsubscribe();

    // this.store.next( updateUserInfo({ userInfo: toUpdate }) );

    console.log('Sent user settings changes ...');
  }

  /*
    Set default entry in template if user has already adequate role
  */
  setSelectedRole() {
    const target = this.userRoles.findIndex((role) => role.value == this.user.role);
    if (target > -1) {
      this.selectedRole = this.user.role;
      console.log('User selected role settings: ', this.selectedRole);
    }
  }

  setCommChannels() {
    if (this.user.com_channels) {

    }
  }

  getCommunicationChannels() : channels[] {

    const communicateByEmail = this.editSettingsForm.controls.email_channel.value;
    const communicateByMessages = this.editSettingsForm.controls.message_channel.value;
    const communicateByPhone = this.editSettingsForm.controls.phone_channel.value;

    const channelsArr : channels[] = [];
    if (communicateByEmail) { channelsArr.push(channels.EMAIL) }
    if (communicateByMessages) { channelsArr.push(channels.MESSAGES) }
    if (communicateByPhone) { channelsArr.push(channels.PHONE) }

    return channelsArr;
  }

}
