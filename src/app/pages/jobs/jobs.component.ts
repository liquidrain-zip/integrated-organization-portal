import { Component, OnInit } from '@angular/core';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { JobsService } from '../../service/jobs.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

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
    this.loadJobOpportunities();
  }

  loadJobOpportunities() {
    this.jobOpportunities$ = this.jobsService
      .getAvailableJobs()
      .pipe(catchError((error) => of([])));
  }

  selectJob(job: JobOpportunity) {
    this.selectedJob = job;
  }

  filterJobs(event: any) {
    const value = event.target.value;
    if (value) {
      this.jobOpportunities$ = this.jobsService.getAvailableJobs().pipe(
        catchError((error) => of([])),
        map((jobs: JobOpportunity[]) =>
          jobs.filter((job: JobOpportunity) =>
            job.title.toLowerCase().includes(value.toLowerCase())
          )
        )
      );
    } else {
      this.loadJobOpportunities();
    }
  }

  sortBy(event: MatButtonToggleChange) {
    const option = event.value;
    this.jobOpportunities$ = this.jobOpportunities$.pipe(
      map((jobs: JobOpportunity[]) => {
        switch (option) {
          case 'title':
            return jobs.slice().sort((a, b) => a.title.localeCompare(b.title));
          case 'company':
            return jobs
              .slice()
              .sort((a, b) => a.company.localeCompare(b.company));
          case 'type':
            return jobs.slice().sort((a, b) => a.type.localeCompare(b.type));
          case 'applications':
            return jobs.slice().sort((a, b) => a.applications - b.applications);
          default:
            return jobs;
        }
      })
    );
  }
}
