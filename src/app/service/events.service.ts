import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface UpcomingEvent {
  title: string;
  date: Date;
  type: string;
  attendance: number;
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private eventsUrl = '/api/events';
  constructor(private http: HttpClient) {}

  getUpcomingEvents(): Observable<UpcomingEvent[]> {
    const userid = 0; // to fix with token
    let params = new HttpParams().set('paramName', userid);

    return this.http
      .get<UpcomingEvent[]>(this.eventsUrl, {
        params: params,
      })
      .pipe(
        map((events) =>
          events.filter((event) => new Date(event.date) > new Date())
        ),
        catchError((error) => of(mockEvents)) // mock response
      );
  }

  registerEvent(event: UpcomingEvent): Observable<any> {
    const token = this.getUserToken();
    let params = new HttpParams().set('token', token);
    let payload = {
      title: event.title,
    };
    return this.http
      .post<any>(this.eventsUrl + '/register', payload, {
        params: params,
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }

  unregisterEvent(event: UpcomingEvent): Observable<any> {
    const token = this.getUserToken();
    let params = new HttpParams().set('token', token);
    let payload = {
      title: event.title,
    };
    return this.http
      .post<any>(this.eventsUrl + '/unregister', payload, {
        params: params,
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }

  private getUserToken() {
    // to fix with token
    return localStorage.getItem('userToken') || '';
  }
}

const mockEvents: UpcomingEvent[] = [
  {
    title: 'Software Engineering Workshop',
    date: new Date('2024-05-22'),
    type: 'Workshop',
    attendance: 100,
    registered: true,
  },
  {
    title: 'Data Science Meetup',
    date: new Date('2024-05-28'),
    type: 'Meetup',
    attendance: 150,
    registered: false,
  },
  {
    title: 'Cloud Computing Fundamentals Course',
    date: new Date('2024-06-10'),
    type: 'Course',
    attendance: 30,
    registered: true,
  },
  {
    title: 'Product Design Conference',
    date: new Date('2024-06-10'),
    type: 'Conference',
    attendance: 500,
    registered: false,
  },
  {
    title: 'Machine Learning Hackathon',
    date: new Date('2024-06-20'),
    type: 'Hackathon',
    attendance: 80,
    registered: false,
  },
  {
    title: 'Blockchain Technology Talk',
    date: new Date('2024-06-27'),
    type: 'Talk',
    attendance: 120,
    registered: false,
  },
  {
    title: 'Front-End Development Masterclass',
    date: new Date('2024-07-03'),
    type: 'Masterclass',
    attendance: 75,
    registered: false,
  },
  {
    title: 'Cybersecurity Awareness Workshop',
    date: new Date('2024-07-10'),
    type: 'Workshop',
    attendance: 200,
    registered: true,
  },
  {
    title: 'Agile Project Management Training',
    date: new Date('2024-07-17'),
    type: 'Training',
    attendance: 40,
    registered: false,
  },
  {
    title: 'UI/UX Design for Mobile Apps Workshop',
    date: new Date('2024-07-24'),
    type: 'Workshop',
    attendance: 60,
    registered: true,
  },
  {
    title: 'Introduction to Artificial Intelligence Seminar',
    date: new Date('2024-08-07'),
    type: 'Seminar',
    attendance: 180,
    registered: true,
  },
  {
    title: 'Big Data Analytics for Business Conference',
    date: new Date('2024-08-14'),
    type: 'Conference',
    attendance: 350,
    registered: false,
  },
  {
    title: 'Internet of Things (IoT) Applications Workshop',
    date: new Date('2024-08-21'),
    type: 'Workshop',
    attendance: 90,
    registered: false,
  },
  {
    title: 'Cloud Security Best Practices Webinar',
    date: new Date('2024-08-28'),
    type: 'Webinar',
    attendance: 250,
    registered: false,
  },
  {
    title: 'Software Development for Startups Bootcamp',
    date: new Date('2024-09-04'),
    type: 'Bootcamp',
    attendance: 45,
    registered: false,
  },
  {
    title: 'Data Visualization with Python Course',
    date: new Date('2024-09-11'),
    type: 'Course',
    attendance: 20,
    registered: false,
  },
  {
    title: 'Effective Communication Skills for Developers Workshop',
    date: new Date('2024-09-18'),
    type: 'Workshop',
    attendance: 85,
    registered: false,
  },
  {
    title: 'Building Scalable Web Applications Conference',
    date: new Date('2024-09-25'),
    type: 'Conference',
    attendance: 600,
    registered: false,
  },
  {
    title: 'The Future of Work in Tech Panel Discussion',
    date: new Date('2024-10-02'),
    type: 'Discussion',
    attendance: 150,
    registered: false,
  },
  {
    title: 'Open Source Software Contribution Workshop',
    date: new Date('2024-10-09'),
    type: 'Workshop',
    attendance: 75,
    registered: false,
  },
];
