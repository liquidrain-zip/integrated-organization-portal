import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface JobOpportunity {
  title: string;
  company: string;
  type: string;
  applications: number;
  location: string;
  application_deadline: Date;
}

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private jobsUrl = '/api/jobs'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAvailableJobs(): Observable<JobOpportunity[]> {
    return this.http.get<JobOpportunity[]>(this.jobsUrl).pipe(
      catchError((error) => of(mockJobs)) // mock response
    );
  }
}

const mockJobs: JobOpportunity[] = [
  {
    title: 'Software Engineer',
    company: 'Tech Giant Inc.',
    type: 'Full-Time',
    applications: 120,
    location: 'Mountain View, CA',
    application_deadline: new Date('2024-06-15'),
  },
  {
    title: 'Data Scientist',
    company: 'Research Lab (University)',
    type: 'Full-Time',
    applications: 85,
    location: 'Seattle, WA',
    application_deadline: new Date('2024-06-01'),
  },
  {
    title: 'Product Manager',
    company: 'Startup Company',
    type: 'Full-Time',
    applications: 210,
    location: 'Remote',
    application_deadline: new Date('2024-05-31'),
  },
  {
    title: 'Web Developer',
    company: 'E-commerce Platform',
    type: 'Full-Time',
    applications: 150,
    location: 'New York, NY',
    application_deadline: new Date('2024-06-10'),
  },
  {
    title: 'UI/UX Designer',
    company: 'Creative Agency',
    type: 'Full-Time',
    applications: 90,
    location: 'Chicago, IL',
    application_deadline: new Date('2024-06-07'),
  },
  {
    title: 'DevOps Engineer',
    company: 'Cloud Service Provider',
    type: 'Full-Time',
    applications: 135,
    location: 'Austin, TX',
    application_deadline: new Date('2024-05-28'),
  },
  {
    title: 'Data Analyst',
    company: 'Marketing Agency',
    type: 'Full-Time',
    applications: 105,
    location: 'Los Angeles, CA',
    application_deadline: new Date('2024-06-12'),
  },
  {
    title: 'Software Architect',
    company: 'Enterprise Software Company',
    type: 'Full-Time',
    applications: 70,
    location: 'Remote',
    application_deadline: new Date('2024-06-20'),
  },
  {
    title: 'Mobile App Developer',
    company: 'Social Media Platform',
    type: 'Full-Time',
    applications: 180,
    location: 'San Francisco, CA',
    application_deadline: new Date('2024-05-25'),
  },
  {
    title: 'Front-End Developer',
    company: 'E-learning Platform',
    type: 'Contract',
    applications: 65,
    location: 'Remote',
    application_deadline: new Date('2024-06-18'),
  },
  {
    title: 'Back-End Developer',
    company: 'Healthcare IT Company',
    type: 'Full-Time',
    applications: 110,
    location: 'Boston, MA',
    application_deadline: new Date('2024-06-05'),
  },
  {
    title: 'QA Engineer',
    company: 'Gaming Studio',
    type: 'Full-Time',
    applications: 140,
    location: 'Montreal, Canada',
    application_deadline: new Date('2024-06-17'),
  },
  {
    title: 'Business Systems Analyst',
    company: 'Financial Services Company',
    type: 'Full-Time',
    applications: 80,
    location: 'London, UK',
    application_deadline: new Date('2024-06-03'),
  },
  {
    title: 'IT Support Specialist',
    company: 'Non-Profit Organization',
    type: 'Full-Time',
    applications: 95,
    location: 'Washington D.C.',
    application_deadline: new Date('2024-06-14'),
  },
];
