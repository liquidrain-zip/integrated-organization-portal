import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface UpcomingEvent {
  title: string;
  date: Date;
  type: string;
  attendance: number;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private eventsUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getUpcomingEvents(): Observable<UpcomingEvent[]> {
    return this.http.get<UpcomingEvent[]>(this.eventsUrl).pipe(
      map((events) =>
        events.filter((event) => new Date(event.date) > new Date())
      ),
      catchError((error) => of(mockEvents)) // mock response
    );
  }
}

const mockEvents: UpcomingEvent[] = [
  {
    title: 'Software Engineering Workshop',
    date: new Date('2024-05-22'),
    type: 'Workshop',
    attendance: 100,
  },
  {
    title: 'Data Science Meetup',
    date: new Date('2024-05-28'),
    type: 'Meetup',
    attendance: 150,
  },
  {
    title: 'Product Design Conference',
    date: new Date('2024-06-10'),
    type: 'Conference',
    attendance: 500,
  },
  {
    title: 'Cloud Computing Fundamentals Course',
    date: new Date('2024-06-15'),
    type: 'Course',
    attendance: 30,
  },
  {
    title: 'Machine Learning Hackathon',
    date: new Date('2024-06-20'),
    type: 'Hackathon',
    attendance: 80,
  },
  {
    title: 'Blockchain Technology Talk',
    date: new Date('2024-06-27'),
    type: 'Talk',
    attendance: 120,
  },
  {
    title: 'Front-End Development Masterclass',
    date: new Date('2024-07-03'),
    type: 'Masterclass',
    attendance: 75,
  },
  {
    title: 'Cybersecurity Awareness Workshop',
    date: new Date('2024-07-10'),
    type: 'Workshop',
    attendance: 200,
  },
  {
    title: 'Agile Project Management Training',
    date: new Date('2024-07-17'),
    type: 'Training',
    attendance: 40,
  },
  {
    title: 'UI/UX Design for Mobile Apps Workshop',
    date: new Date('2024-07-24'),
    type: 'Workshop',
    attendance: 60,
  },
  {
    title: 'Introduction to Artificial Intelligence Seminar',
    date: new Date('2024-08-07'),
    type: 'Seminar',
    attendance: 180,
  },
  {
    title: 'Big Data Analytics for Business Conference',
    date: new Date('2024-08-14'),
    type: 'Conference',
    attendance: 350,
  },
  {
    title: 'Internet of Things (IoT) Applications Workshop',
    date: new Date('2024-08-21'),
    type: 'Workshop',
    attendance: 90,
  },
  {
    title: 'Cloud Security Best Practices Webinar',
    date: new Date('2024-08-28'),
    type: 'Webinar',
    attendance: 250,
  },
  {
    title: 'Software Development for Startups Bootcamp',
    date: new Date('2024-09-04'),
    type: 'Bootcamp',
    attendance: 45,
  },
  {
    title: 'Data Visualization with Python Course',
    date: new Date('2024-09-11'),
    type: 'Course',
    attendance: 20,
  },
  {
    title: 'Effective Communication Skills for Developers Workshop',
    date: new Date('2024-09-18'),
    type: 'Workshop',
    attendance: 85,
  },
  {
    title: 'Building Scalable Web Applications Conference',
    date: new Date('2024-09-25'),
    type: 'Conference',
    attendance: 600,
  },
  {
    title: 'The Future of Work in Tech Panel Discussion',
    date: new Date('2024-10-02'),
    type: 'Discussion',
    attendance: 150,
  },
];
