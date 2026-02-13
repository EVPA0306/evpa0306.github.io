import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    program: '',
    experienceLevel: '',
    goals: '',
    medicalConditions: '',
    termsAccepted: false
  };

  programs = [
    'Strength Training',
    'Endurance Training',
    'Speed & Agility',
    'Sports-Specific Training',
    'Rehabilitation',
    'General Fitness'
  ];

  experienceLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Elite'
  ];

  submitted = false;

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.formData);
      this.submitted = true;
      // Here you would typically send the data to a backend service
    }
  }

  isFormValid(): boolean {
    return !!(
      this.formData.firstName &&
      this.formData.lastName &&
      this.formData.email &&
      this.formData.phone &&
      this.formData.program &&
      this.formData.experienceLevel &&
      this.formData.termsAccepted
    );
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      program: '',
      experienceLevel: '',
      goals: '',
      medicalConditions: '',
      termsAccepted: false
    };
    this.submitted = false;
  }
}
