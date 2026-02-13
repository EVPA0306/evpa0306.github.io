import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ScheduleItem {
  time: string;
  title: string;
  coach: string;
  level: string;
  duration: string;
  spots: number;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  selectedDay = 'monday';
  
  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  schedule: { [key: string]: ScheduleItem[] } = {
    monday: [
      { time: '6:00 AM', title: 'Morning Strength Training', coach: 'Alex Rodriguez', level: 'All Levels', duration: '60 min', spots: 12 },
      { time: '9:00 AM', title: 'HIIT Cardio Blast', coach: 'Sarah Chen', level: 'Intermediate', duration: '45 min', spots: 8 },
      { time: '12:00 PM', title: 'Functional Fitness', coach: 'Mike Johnson', level: 'Beginner', duration: '60 min', spots: 15 },
      { time: '5:00 PM', title: 'Olympic Weightlifting', coach: 'Elena Pavlenko', level: 'Advanced', duration: '90 min', spots: 6 },
      { time: '7:00 PM', title: 'Mobility & Recovery', coach: 'Tom Williams', level: 'All Levels', duration: '45 min', spots: 20 }
    ],
    tuesday: [
      { time: '6:00 AM', title: 'Endurance Training', coach: 'Sarah Chen', level: 'All Levels', duration: '75 min', spots: 10 },
      { time: '10:00 AM', title: 'Athletic Performance', coach: 'Alex Rodriguez', level: 'Intermediate', duration: '60 min', spots: 12 },
      { time: '4:00 PM', title: 'Speed & Agility', coach: 'Mike Johnson', level: 'Advanced', duration: '60 min', spots: 8 },
      { time: '6:30 PM', title: 'Powerlifting Fundamentals', coach: 'Elena Pavlenko', level: 'Beginner', duration: '90 min', spots: 10 }
    ],
    wednesday: [
      { time: '6:00 AM', title: 'CrossFit WOD', coach: 'Mike Johnson', level: 'Intermediate', duration: '60 min', spots: 15 },
      { time: '9:30 AM', title: 'Core & Conditioning', coach: 'Tom Williams', level: 'All Levels', duration: '45 min', spots: 20 },
      { time: '5:00 PM', title: 'Sports Performance', coach: 'Sarah Chen', level: 'Advanced', duration: '90 min', spots: 8 },
      { time: '7:00 PM', title: 'Yoga for Athletes', coach: 'Lisa Anderson', level: 'All Levels', duration: '60 min', spots: 15 }
    ],
    thursday: [
      { time: '6:00 AM', title: 'Strength & Power', coach: 'Elena Pavlenko', level: 'Advanced', duration: '90 min', spots: 6 },
      { time: '10:00 AM', title: 'Bootcamp', coach: 'Alex Rodriguez', level: 'All Levels', duration: '60 min', spots: 18 },
      { time: '4:00 PM', title: 'Plyometric Training', coach: 'Mike Johnson', level: 'Intermediate', duration: '45 min', spots: 12 },
      { time: '6:00 PM', title: 'Conditioning Circuit', coach: 'Sarah Chen', level: 'Beginner', duration: '60 min', spots: 15 }
    ],
    friday: [
      { time: '6:00 AM', title: 'Full Body Blast', coach: 'Tom Williams', level: 'All Levels', duration: '60 min', spots: 15 },
      { time: '9:00 AM', title: 'Olympic Lifting', coach: 'Elena Pavlenko', level: 'Advanced', duration: '90 min', spots: 6 },
      { time: '5:00 PM', title: 'Friday Night Lights', coach: 'Alex Rodriguez', level: 'Intermediate', duration: '75 min', spots: 20 },
      { time: '7:00 PM', title: 'Recovery & Stretch', coach: 'Lisa Anderson', level: 'All Levels', duration: '45 min', spots: 25 }
    ],
    saturday: [
      { time: '8:00 AM', title: 'Weekend Warriors', coach: 'Mike Johnson', level: 'All Levels', duration: '90 min', spots: 20 },
      { time: '10:30 AM', title: 'Strength Clinic', coach: 'Elena Pavlenko', level: 'Beginner', duration: '60 min', spots: 12 },
      { time: '1:00 PM', title: 'Open Gym', coach: 'Staff Supervised', level: 'All Levels', duration: '120 min', spots: 30 }
    ],
    sunday: [
      { time: '9:00 AM', title: 'Active Recovery', coach: 'Tom Williams', level: 'All Levels', duration: '45 min', spots: 15 },
      { time: '11:00 AM', title: 'Yoga & Meditation', coach: 'Lisa Anderson', level: 'All Levels', duration: '60 min', spots: 20 },
      { time: '2:00 PM', title: 'Open Gym', coach: 'Staff Supervised', level: 'All Levels', duration: '180 min', spots: 30 }
    ]
  };

  selectDay(day: string) {
    this.selectedDay = day;
  }

  getDaySchedule(): ScheduleItem[] {
    return this.schedule[this.selectedDay] || [];
  }

  capitalizeDay(day: string): string {
    return day.charAt(0).toUpperCase() + day.slice(1);
  }
}
