import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { EventsService } from '../../service/events.service';

interface UpcomingEvent {
  title: string;
  date: Date;
  type: string;
  attendance: number;
  registered: boolean;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  upcomingEvents$: Observable<UpcomingEvent[]>;
  selectedEvent: UpcomingEvent;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.upcomingEvents$ = this.eventsService
      .getUpcomingEvents()
      .pipe(catchError((error) => of([])));
  }

  selectEvent(event: UpcomingEvent) {
    this.selectedEvent = event;
  }

  registerEvent(event: UpcomingEvent) {
    this.eventsService.registerEvent(event).subscribe({
      next: (response) => {
        console.log('Event registered successfully!', response);
      },
      error: (error) => {
        console.error('Error registering event:', error);
      },
    });
  }

  unregisterEvent(event: UpcomingEvent) {
    this.eventsService.unregisterEvent(event).subscribe({
      next: (response) => {
        console.log('Event unregistered successfully!', response);
      },
      error: (error) => {
        console.error('Error unregistering event:', error);
      },
    });
  }
}
