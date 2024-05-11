import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface JobOpportunity {
  title: string;
  company: string;
  type: string;
  applications: number;
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
  },
  {
    title: 'Data Scientist',
    company: 'Research Lab',
    type: 'Full-Time',
    applications: 85,
  },
  {
    title: 'Product Manager',
    company: 'Startup Company',
    type: 'Full-Time',
    applications: 210,
  },
  {
    title: 'Web Developer',
    company: 'E-commerce Platform',
    type: 'Full-Time',
    applications: 150,
  },
  {
    title: 'UI/UX Designer',
    company: 'Creative Agency',
    type: 'Full-Time',
    applications: 90,
  },
  {
    title: 'DevOps Engineer',
    company: 'Cloud Service Provider',
    type: 'Full-Time',
    applications: 135,
  },
  {
    title: 'Data Analyst',
    company: 'Marketing Agency',
    type: 'Full-Time',
    applications: 105,
  },
  {
    title: 'Software Architect',
    company: 'Enterprise Software Company',
    type: 'Full-Time',
    applications: 70,
  },
  {
    title: 'Mobile App Developer',
    company: 'Social Media Platform',
    type: 'Full-Time',
    applications: 180,
  },
  {
    title: 'Front-End Developer',
    company: 'E-learning Platform',
    type: 'Contract',
    applications: 65,
  },
  {
    title: 'Back-End Developer',
    company: 'Healthcare IT Company',
    type: 'Full-Time',
    applications: 110,
  },
  {
    title: 'QA Engineer',
    company: 'Gaming Studio',
    type: 'Full-Time',
    applications: 140,
  },
  {
    title: 'Business Systems Analyst',
    company: 'Financial Services Company',
    type: 'Full-Time',
    applications: 80,
  },
  {
    title: 'IT Support Specialist',
    company: 'Non-Profit Organization',
    type: 'Full-Time',
    applications: 95,
  },
  {
    title: 'Network Security Engineer',
    company: 'Cybersecurity Firm',
    type: 'Full-Time',
    applications: 160,
  },
  {
    title: 'Data Engineer',
    company: 'E-commerce Platform',
    type: 'Full-Time',
    applications: 125,
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Autonomous Vehicle Company',
    type: 'Full-Time',
    applications: 200,
  },
  {
    title: 'Product Designer',
    company: 'Educational Software Company',
    type: 'Full-Time',
    applications: 100,
  },
  {
    title: 'Content Marketing Specialist',
    company: 'Tech Startup',
    type: 'Full-Time',
    applications: 170,
  },
];
