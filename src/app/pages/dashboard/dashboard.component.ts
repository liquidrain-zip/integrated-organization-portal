import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { EventsService } from '../../service/events.service';
import { JobsService } from '../../service/jobs.service';

interface UpcomingEvent {
  title: string;
  date: Date;
}

interface JobOpportunity {
  title: string;
  company: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  upcomingEvents$: Observable<UpcomingEvent[]>;
  jobOpportunities$: Observable<JobOpportunity[]>;

  constructor(
    private eventsService: EventsService,
    private jobsService: JobsService
  ) {}

  ngOnInit() {
    this.upcomingEvents$ = this.eventsService.getUpcomingEvents().pipe(
      map((events) => events.slice(0, 5)), // Limit to 5 upcoming events
      catchError((error) => of([])) // Handle errors by returning empty array
    );

    this.jobOpportunities$ = this.jobsService.getAvailableJobs().pipe(
      map((jobs) => jobs.slice(0, 5)), // Limit to 5 job opportunities
      catchError((error) => of([])) // Handle errors by returning empty array
    );
  }
}
