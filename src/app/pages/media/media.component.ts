import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MediaItem {
  type: 'video' | 'image' | 'article';
  title: string;
  description: string;
  date: string;
  category: string;
}

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  selectedFilter = 'all';
  
  filters = [
    { value: 'all', label: 'All Media' },
    { value: 'video', label: 'Videos' },
    { value: 'image', label: 'Gallery' },
    { value: 'article', label: 'Articles' }
  ];

  mediaItems: MediaItem[] = [
    {
      type: 'video',
      title: 'Olympic Lifting Technique Breakdown',
      description: 'Coach Elena demonstrates proper form and progression for the clean and jerk.',
      date: 'Feb 5, 2026',
      category: 'Technique'
    },
    {
      type: 'image',
      title: 'Facility Tour: Training Floor',
      description: 'Get an inside look at our state-of-the-art training equipment and facilities.',
      date: 'Feb 1, 2026',
      category: 'Facilities'
    },
    {
      type: 'article',
      title: '5 Keys to Building Athletic Power',
      description: 'Discover the fundamental principles behind developing explosive strength and power.',
      date: 'Jan 28, 2026',
      category: 'Training Tips'
    },
    {
      type: 'video',
      title: 'HIIT Workout: 20-Minute Fat Burner',
      description: 'Follow along with Coach Sarah for an intense cardio conditioning session.',
      date: 'Jan 25, 2026',
      category: 'Workouts'
    },
    {
      type: 'image',
      title: 'Athlete Success Stories',
      description: 'Celebrating our members and their incredible transformation journeys.',
      date: 'Jan 20, 2026',
      category: 'Success Stories'
    },
    {
      type: 'article',
      title: 'The Science of Recovery',
      description: 'Understanding how proper recovery maximizes your training adaptations.',
      date: 'Jan 15, 2026',
      category: 'Recovery'
    },
    {
      type: 'video',
      title: 'Speed and Agility Drills',
      description: 'Coach Mike shares his favorite drills for developing elite-level speed.',
      date: 'Jan 10, 2026',
      category: 'Speed Training'
    },
    {
      type: 'image',
      title: 'Community Events Gallery',
      description: 'Photos from our recent community workout and charity fundraiser event.',
      date: 'Jan 5, 2026',
      category: 'Events'
    },
    {
      type: 'article',
      title: 'Nutrition for Performance',
      description: 'Expert guidance on fueling your body for optimal training and recovery.',
      date: 'Dec 30, 2025',
      category: 'Nutrition'
    }
  ];

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  getFilteredMedia(): MediaItem[] {
    if (this.selectedFilter === 'all') {
      return this.mediaItems;
    }
    return this.mediaItems.filter(item => item.type === this.selectedFilter);
  }

  getMediaIcon(type: string): string {
    switch(type) {
      case 'video': return '🎥';
      case 'image': return '📸';
      case 'article': return '📄';
      default: return '📋';
    }
  }
}
