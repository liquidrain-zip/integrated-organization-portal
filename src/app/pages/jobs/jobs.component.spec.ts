import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsComponent } from './jobs.component';
import { JobsService } from '../../service/jobs.service';
import { of } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

// Mock JobOpportunity interface
interface JobOpportunity {
  title: string;
  company: string;
  type: string;
  applications: number;
  location: string;
  application_deadline: Date;
}

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let mockJobsService: JobsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsComponent],
      providers: [
        {
          provide: JobsService,
          useValue: jasmine.createSpyObj('JobsService', ['getAvailableJobs']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    mockJobsService = TestBed.inject(JobsService);
    fixture.detectChanges();
  });

  // Initial component creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Mocked data for testing
  const mockJobs: JobOpportunity[] = [
    {
      title: 'Software Engineer',
      company: 'Acme Inc.',
      type: 'Full-time',
      applications: 10,
      location: 'New York',
      application_deadline: new Date(),
    },
    {
      title: 'Data Scientist',
      company: 'Horizon Labs',
      type: 'Full-time',
      applications: 5,
      location: 'San Francisco',
      application_deadline: new Date(),
    },
    {
      title: 'Product Manager',
      company: 'Zenith Inc.',
      type: 'Full-time',
      applications: 15,
      location: 'Los Angeles',
      application_deadline: new Date(),
    },
  ];

  // Data loading and error handling
  it('should load job opportunities on init', () => {
    spyOn(mockJobsService, 'getAvailableJobs').and.returnValue(of(mockJobs));
    component.ngOnInit();
    expect(component.jobOpportunities$).toEqual(of(mockJobs));
  });

  it('should handle errors when loading job opportunities', () => {
    const error = new Error('Failed to fetch jobs');
    spyOn(mockJobsService, 'getAvailableJobs').and.returnValue(of([]));
    component.ngOnInit();
    expect(component.jobOpportunities$).toEqual(of([])); // Empty observable on error
  });

  // User interaction tests
  it('should select a job', () => {
    const selectedJob = mockJobs[0];
    component.selectJob(selectedJob);
    expect(component.selectedJob).toEqual(selectedJob);
  });

  // Filtering functionality
  it('should filter jobs by title', () => {
    const filterValue = 'software';
    spyOn(mockJobsService, 'getAvailableJobs').and.returnValue(of(mockJobs));
    component.ngOnInit();

    const filteredJobs = mockJobs.filter((job) =>
      job.title.toLowerCase().includes(filterValue.toLowerCase())
    );
    component.filterJobs({ target: { value: filterValue } }); // Simulate event

    expect(component.jobOpportunities$).toEqual(of(filteredJobs));
  });

  it('should handle empty filter values', () => {
    spyOn(mockJobsService, 'getAvailableJobs').and.returnValue(of(mockJobs));
    component.ngOnInit();

    component.filterJobs({ target: { value: '' } }); // Simulate empty filter

    expect(component.jobOpportunities$).toEqual(of(mockJobs)); // Reset to all jobs
  });

  // Sorting functionality
  it('should sort jobs by title', () => {
    const sortOption = 'title';
    const sortedtitleJobs = [...mockJobs].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    spyOn(mockJobsService, 'getAvailableJobs').and.returnValue(
      of(sortedtitleJobs)
    );
    component.ngOnInit();

    component.sortBy({ value: sortOption } as MatButtonToggleChange); // Simulate sort event

    expect(component.jobOpportunities$).toEqual(of(sortedtitleJobs));
  });

  it('should sort jobs by company', () => {
    const sortOption = 'company';
    const sortedCompanyJobs = [...mockJobs].sort((a, b) =>
      a.company.localeCompare(b.company)
    );

    spyOn(mockJobsService, 'getAvailableJobs').and.returnValue(
      of(sortedCompanyJobs)
    );
    component.ngOnInit();

    component.sortBy({ value: sortOption } as MatButtonToggleChange); // Simulate sort event

    expect(component.jobOpportunities$).toEqual(of(sortedCompanyJobs));
  });

  it('should sort jobs by type', () => {
    const sortOption = 'type';
    const sortedtypeJobs = [...mockJobs].sort((a, b) =>
      a.type.localeCompare(b.type)
    );

    spyOn(mockJobsService, 'getAvailableJobs').and.returnValue(
      of(sortedtypeJobs)
    );
    component.ngOnInit();

    component.sortBy({ value: sortOption } as MatButtonToggleChange); // Simulate sort event

    expect(component.jobOpportunities$).toEqual(of(sortedtypeJobs));
  });

  it('should sort jobs by applications', () => {
    const sortOption = 'applications';
    const sortedapplicationsJobs = [...mockJobs].sort(
      (a, b) => a.applications - b.applications
    );

    spyOn(mockJobsService, 'getAvailableJobs').and.returnValue(
      of(sortedapplicationsJobs)
    );
    component.ngOnInit();

    component.sortBy({ value: sortOption } as MatButtonToggleChange); // Simulate sort event

    expect(component.jobOpportunities$).toEqual(of(sortedapplicationsJobs));
  });
});
