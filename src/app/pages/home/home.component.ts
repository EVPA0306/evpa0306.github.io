import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      icon: '🎯',
      title: 'Expert Coaching',
      description: 'World-class trainers with proven track records in elite performance development.'
    },
    {
      icon: '📊',
      title: 'Personalized Programs',
      description: 'Custom training plans tailored to your goals, abilities, and progress.'
    },
    {
      icon: '🏆',
      title: 'Proven Results',
      description: 'Data-driven methodology that delivers measurable improvements and success.'
    },
    {
      icon: '⚡',
      title: 'Modern Facilities',
      description: 'State-of-the-art equipment and training spaces designed for peak performance.'
    }
  ];

  stats = [
    { value: '500+', label: 'Athletes Trained' },
    { value: '15+', label: 'Years Experience' },
    { value: '95%', label: 'Success Rate' },
    { value: '24/7', label: 'Support Available' }
  ];
}
