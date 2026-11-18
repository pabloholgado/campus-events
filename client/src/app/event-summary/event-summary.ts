
import { Component, computed, input } from '@angular/core';
import { CampusEvent } from '../campus-event';

@Component({
  selector: 'app-event-summary',
  imports: [],
  templateUrl: './event-summary.html',
  styleUrl: './event-summary.css',
})
export class EventSummary {
  events = input.required<CampusEvent[]>();

  count = computed(() => this.events().length);

  totalCapacity = computed(() =>
    this.events().reduce((sum, e) => sum + e.capacity, 0)
  );

  nextEventTitle = computed(() => {
    const now = new Date();

    const next = this.events()
      .filter(e => new Date(e.date) > now)
      .sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      )[0];

    return next ? next.title : 'No upcoming events';
  });
}
