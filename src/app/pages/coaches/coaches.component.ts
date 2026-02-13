import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Coach {
  name: string;
  title: string;
  specialties: string[];
  bio: string;
  certifications: string[];
  experience: string;
}

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent {
  coaches: Coach[] = [
    {
      name: 'Elena Pavlenko',
      title: 'Head Coach & Founder',
      specialties: ['Olympic Weightlifting', 'Strength Training', 'Athletic Performance'],
      bio: 'Elena brings over 15 years of elite coaching experience, having trained national-level athletes and olympians. Her data-driven approach combines traditional strength training with cutting-edge sports science.',
      certifications: ['USAW Level 3', 'NSCA-CSCS', 'USA Track & Field Level 2'],
      experience: '15+ years'
    },
    {
      name: 'Alex Rodriguez',
      title: 'Performance Coach',
      specialties: ['Functional Training', 'Sports Performance', 'Injury Prevention'],
      bio: 'Alex specializes in developing functional strength and athletic performance. His programs focus on movement quality, injury prevention, and sustainable performance gains.',
      certifications: ['NSCA-CSCS', 'FMS Level 2', 'Precision Nutrition Level 1'],
      experience: '10+ years'
    },
    {
      name: 'Sarah Chen',
      title: 'Endurance & Conditioning Coach',
      specialties: ['Endurance Training', 'HIIT', 'Metabolic Conditioning'],
      bio: 'Sarah is a former competitive runner who now helps athletes of all levels build exceptional cardiovascular capacity and endurance. Her programs are challenging yet accessible.',
      certifications: ['USATF Level 2', 'ACE Certified', 'CPR/AED'],
      experience: '8+ years'
    },
    {
      name: 'Mike Johnson',
      title: 'Strength & CrossFit Coach',
      specialties: ['CrossFit', 'Powerlifting', 'Speed Training'],
      bio: 'Mike combines his powerlifting background with CrossFit methodology to create comprehensive strength and conditioning programs. He excels at coaching beginners and advanced athletes alike.',
      certifications: ['CrossFit Level 2', 'USAPL Club Coach', 'NASM-CPT'],
      experience: '12+ years'
    },
    {
      name: 'Lisa Anderson',
      title: 'Mobility & Recovery Specialist',
      specialties: ['Yoga', 'Mobility Training', 'Recovery Protocols'],
      bio: 'Lisa focuses on the often-overlooked aspects of training: mobility, flexibility, and recovery. Her classes help athletes prevent injuries and improve movement quality.',
      certifications: ['RYT-500', 'NASM-CES', 'FRCms'],
      experience: '7+ years'
    },
    {
      name: 'Tom Williams',
      title: 'Sports Nutrition Coach',
      specialties: ['Nutrition Planning', 'Body Composition', 'Performance Fueling'],
      bio: 'Tom works with athletes to optimize their nutrition for performance and recovery. He creates individualized nutrition plans that support training goals and lifestyle.',
      certifications: ['CISSN', 'Precision Nutrition Level 2', 'NSCA-CPT'],
      experience: '9+ years'
    }
  ];
}
