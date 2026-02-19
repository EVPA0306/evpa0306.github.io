import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ScheduleRow {
  date: string;
  day: string;
  groupA: string;
  groupB: string;
  arena: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  scheduleData: ScheduleRow[] = [
    {
      date: 'March 19',
      day: 'Thursday',
      groupA: '05:40 PM - 07:10 PM',
      groupB: '04:00 PM - 05:30 PM',
      arena: 'Sport Stable Ice Arena'
    },
    {
      date: 'March 20',
      day: 'Friday',
      groupA: '06:40 PM - 08:10 PM',
      groupB: '05:00 PM - 06:30 PM',
      arena: 'Sport Stable Ice Arena'
    },
    {
      date: 'March 21',
      day: 'Saturday',
      groupA: '09:00 AM - 10:30 AM ',
      groupB: '10:40 AM - 12:10 PM',
      arena: 'Sport Stable Ice Arena'
    }
  ];
}
