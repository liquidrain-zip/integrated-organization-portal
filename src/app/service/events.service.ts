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
      catchError((error) => of([]))
    );
  }
}
