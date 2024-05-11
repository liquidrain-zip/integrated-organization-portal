import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface UpcomingEvent {
  title: string;
  date: Date;
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
  { title: 'Software Engineering Workshop', date: new Date('2024-05-22') },
  { title: 'Data Science Meetup', date: new Date('2024-05-28') },
  { title: 'Product Design Conference', date: new Date('2024-06-10') },
  { title: 'Cloud Computing Fundamentals', date: new Date('2024-06-15') },
  { title: 'Machine Learning Hackathon', date: new Date('2024-06-20') },
  { title: 'Blockchain Technology Talk', date: new Date('2024-06-27') },
  { title: 'Front-End Development Masterclass', date: new Date('2024-07-03') },
  { title: 'Cybersecurity Awareness Workshop', date: new Date('2024-07-10') },
  { title: 'Agile Project Management Training', date: new Date('2024-07-17') },
  { title: 'UI/UX Design for Mobile Apps', date: new Date('2024-07-24') },
  {
    title: 'Introduction to Artificial Intelligence',
    date: new Date('2024-08-07'),
  },
  { title: 'Big Data Analytics for Business', date: new Date('2024-08-14') },
  {
    title: 'Internet of Things (IoT) Applications',
    date: new Date('2024-08-21'),
  },
  { title: 'Cloud Security Best Practices', date: new Date('2024-08-28') },
  { title: 'Software Development for Startups', date: new Date('2024-09-04') },
  { title: 'Data Visualization with Python', date: new Date('2024-09-11') },
  {
    title: 'Effective Communication Skills for Developers',
    date: new Date('2024-09-18'),
  },
  { title: 'Building Scalable Web Applications', date: new Date('2024-09-25') },
  { title: 'The Future of Work in Tech', date: new Date('2024-10-02') },
  {
    title: 'Open Source Software Contribution Workshop',
    date: new Date('2024-10-09'),
  },
];
