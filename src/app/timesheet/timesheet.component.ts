import { Component, OnInit } from '@angular/core';

import {FormControl, Validators, NgForm, NgModel} from '@angular/forms';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
/*import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;*/
const moment = _moment;

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  animations:[
    trigger('animateArea', [
      transition('* => *', [
        query(':enter', style({opacity:0}), {optional:true}),

        query(':enter', stagger('300ms',[
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform:'translateY(-75%)', offset:0}),
            style({opacity:.5, transform:'translateY(35px)', offset:.3}),
            style({opacity:1, transform:'translateY(0)', offset:1}),
          ]))
        ]), {optional:true}),

        query(':leave', stagger('300ms',[
          animate('.6s ease-in', keyframes([
            style({opacity:1, transform:'translateY(0)', offset:0}),
            style({opacity:.5, transform:'translateY(35px)', offset:.3}),
            style({opacity:0, transform:'translateY(-75%)', offset:1}),
          ]))
        ]), {optional:true})
      ])

    ])

  ]
})
export class TimesheetComponent implements OnInit {
  
  activities:any[];
  project_activities:any[];

  //date = new FormControl(moment([2017, 0, 1]));
  date = new FormControl(new Date());
  d: Date = new Date();
  hh = this.d.getHours();
  min = this.d.getMinutes();
  startTime = this.hh + ":" + this.min;
  endTime = this.hh + ":" + this.min;
  calcTime = this.startTime + ' - ' + this.endTime;

  isMeridian = false;

  constructor(private route:ActivatedRoute, private router: Router, private _data: DataService) {
    this.activities = [
      {value: '1', viewValue: 'Client Meeting'},
      {value: '2', viewValue: 'Demo'},
      {value: '3', viewValue: 'Development'},
      {value: '4', viewValue: 'Test Automation'},
      {value: '5', viewValue: 'Documentation'},
      {value: '6', viewValue: 'Code Review'},
      {value: '7', viewValue: 'Review'},
      {value: '8', viewValue: 'Training'},
      {value: '9', viewValue: 'Session'},
      {value: '10', viewValue: 'Peer Review'},
      {value: '11', viewValue: 'Testing'},
      {value: '12', viewValue: 'Scripting'},
      {value: '13', viewValue: 'Support'},
      {value: '14', viewValue: 'Management Acitivity'},
      {value: '15', viewValue: 'DB Design'},
      {value: '16', viewValue: 'Analysis'},
      {value: '17', viewValue: 'UI Design'},
      {value: '18', viewValue: 'Others'},
      {value: '19', viewValue: 'Meeting'},
      {value: '20', viewValue: 'Self Learning'},
      {value: '21', viewValue: 'R &amp; D'},
      {value: '22', viewValue: 'Development – Onsite'},
      {value: '23', viewValue: 'Testing - Onsite'},
      {value: '24', viewValue: 'Reports'}
    ];

    this.project_activities = [
      {value: '1', viewValue: 'Cyber Predictor'},
      {value: '2', viewValue: 'MAZDA ASP'},
      {value: '3', viewValue: 'Others'},
      {value: '4', viewValue: 'Perfixit'},
      {value: '5', viewValue: 'QAssure Internal'},
      {value: '6', viewValue: 'QAssure Website Design'},
      {value: '7', viewValue: 'Q-Rator'},
      {value: '8', viewValue: 'Test Environment Mgmt'},
      {value: '9', viewValue: 'Training'}
    ];
   }

  
  menuNav = [
    {icon: 'timelapse', name: 'Time Sheet', link:'timesheet'},
    {icon: 'insert_chart', name: 'Reports', link:'reports'},
    {icon: 'today', name: 'Leave Apply', link:'leaveapply'},
    {icon: 'face', name: 'Resource Request', link:'resourcerequest'},
    {icon: 'layers', name: 'Projects', link:'projects'}
  ];
  loginUsername : string = 'MugeshKumar Devaraj';



  itemCount: number;
  //goalText: string = 'My First Projects Qunatify'; 
  goals = [];
  isOpen : boolean;
  
  selected_Activity = '';
  selected_project_activities = '';
  notes = this.notes;

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }
  addTask() {
    //alert(this.selected_Activity + ' : ' + this.selected_project_activities + ' : ' + this.notes);
    this.goals.push(this.selected_Activity + ' : ' + this.selected_project_activities + ' : ' + this.notes);

    this.selected_Activity = '';
    this.selected_project_activities = '';
    this.notes = '';

    this.isOpen = false;
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }
  clearTask() {
    this.selected_Activity = '';
    this.selected_project_activities = '';
    this.notes = '';
    this.isOpen = false;
  }
  removeItem(i)
  {
    this.goals.splice(i,1); 
    this._data.changeGoal(this.goals);
  }

    
}
