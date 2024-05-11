import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface JobOpportunity {
  title: string;
  company: string;
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
  { title: 'Software Engineer', company: 'Tech Giant Inc.' },
  { title: 'Data Scientist', company: 'Research Lab' },
  { title: 'Product Manager', company: 'Startup Company' },
  { title: 'Web Developer', company: 'E-commerce Platform' },
  { title: 'UI/UX Designer', company: 'Creative Agency' },
  { title: 'Full Stack Developer', company: 'Fintech Startup' },
  { title: 'DevOps Engineer', company: 'Cloud Service Provider' },
  { title: 'Data Analyst', company: 'Marketing Agency' },
  { title: 'Software Architect', company: 'Enterprise Software Company' },
  { title: 'Mobile App Developer', company: 'Social Media Platform' },
  { title: 'Front-End Developer', company: 'E-learning Platform' },
  { title: 'Back-End Developer', company: 'Healthcare IT Company' },
  { title: 'QA Engineer', company: 'Gaming Studio' },
  { title: 'Business Systems Analyst', company: 'Financial Services Company' },
  { title: 'IT Support Specialist', company: 'Non-Profit Organization' },
  { title: 'Network Security Engineer', company: 'Cybersecurity Firm' },
  { title: 'Data Engineer', company: 'E-commerce Platform' },
  { title: 'Machine Learning Engineer', company: 'Autonomous Vehicle Company' },
  { title: 'Product Designer', company: 'Educational Software Company' },
  { title: 'Content Marketing Specialist', company: 'Tech Startup' },
];
