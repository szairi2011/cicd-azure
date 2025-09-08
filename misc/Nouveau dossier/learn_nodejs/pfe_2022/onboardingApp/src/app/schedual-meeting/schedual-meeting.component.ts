import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  Mentors: string;
  New_joiner: string;
  Topic: string;
  Meeting: string;
  Status: string;
  button:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Mentors: 'Sofiene', New_joiner: "Amani", Topic: 'Java', Meeting:"23/09/2022",Status:"Invitation",button:''},
  {Mentors: 'Houssem', New_joiner: "salha", Topic: 'Angular', Meeting:"23/09/2022", Status:"Released",button:''},
  {Mentors: 'Seifedine', New_joiner: "Skander", Topic: 'Docker', Meeting:"23/09/2022", Status:"Meeting",button:''},
  {Mentors: 'Raoua', New_joiner: "Arbi", Topic: '.Net', Meeting:"23/09/2022", Status:"Meeting",button:''},

];
@Component({
  selector: 'app-schedual-meeting',
  templateUrl: './schedual-meeting.component.html',
  styleUrls: ['./schedual-meeting.component.scss']
})
export class SchedualMeetingComponent{

  displayedColumns: string[] = ['Mentors', 'New joiner', 'Topic', 'Meeting','Status','button'];
  dataSource = ELEMENT_DATA;
}
