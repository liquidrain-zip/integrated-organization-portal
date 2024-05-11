import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { JobsService } from '../../service/jobs.service';

interface JobOpportunity {
  title: string;
  company: string;
  type: string;
  applications: number;
  location: string;
  application_deadline: Date;
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit {
  jobOpportunities$: Observable<JobOpportunity[]>;
  selectedJob: JobOpportunity;

  constructor(private jobsService: JobsService) {}

  ngOnInit() {
    this.jobOpportunities$ = this.jobsService
      .getAvailableJobs()
      .pipe(catchError((error) => of([])));
  }

  selectJob(job: JobOpportunity) {
    this.selectedJob = job;
  }
}
