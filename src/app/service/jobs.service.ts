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
      catchError((error) => of([])) // Handle errors by returning empty array
    );
  }
}
