
import { Component, computed, signal } from '@angular/core';
import { CampusEvent } from '../campus-event';
import { EventCard } from '../event-card/event-card';
import { EventSummary } from '../event-summary/event-summary';

@Component({
  imports: [EventCard, EventSummary],
  selector: 'app-event-list',
  styleUrl: './event-list.css',
  templateUrl: './event-list.html',
})
export class EventList {
  events = signal<CampusEvent[]>([
    {
      id: 1,
      title: 'Welcome party for Erasmus students',
      description: 'Meet the other exchange students, eat pizza and get your welcome pack.',
      date: '2026-10-15T18:00',
      location: 'Main hall, building A',
      capacity: 120,
    },
    {
      id: 2,
      title: 'Hackathon: apps for the city',
      description: 'Build an app that makes life in Kraków easier.',
      date: '2026-11-07T09:00',
      location: 'Lab 204',
      capacity: 40,
    },
    {
      id: 3,
      title: 'Board game night',
      description: '',
      date: '2026-10-22T19:00',
      location: 'Student club',
      capacity: 30,
    },

{
  id: 4,
  title: 'Programming workshop',
  description: 'Learn web development with other students.',
  date: '2026-11-20T10:00',
  location: 'University, Room 101',
  capacity: 25,
},
{
  id: 5,
  title: 'Erasmus meetup',
  description: 'Meet international students.',
  date: '2026-11-22T17:00',
  location: 'Student club',
  capacity: 50,
},
{
  id: 6,
  title: 'Quiz night',
  description: 'A fun quiz for students.',
  date: '2026-11-10T19:00',
  location: 'Main hall',
  capacity: 30,
},

  ]);

  search = signal('');
  sortBy = signal('date');

  
visibleEvents = computed(() => {
  const q = this.search().toLowerCase();
  const sort = this.sortBy();

  return this.events()
    .filter((e) => e.title.toLowerCase().includes(q))
    .sort((a, b) =>
      sort === 'title'
        ? a.title.localeCompare(b.title)
        : a.date.localeCompare(b.date)
    );
});

upcomingEvents = computed(() => {
  const now = Date.now();
  return this.visibleEvents().filter(
    (e) => new Date(e.date).getTime() > now
  );
});

pastEvents = computed(() => {
  const now = Date.now();
  return this.visibleEvents().filter(
    (e) => new Date(e.date).getTime() <= now
  );
});
;

  
favourites = signal<number[]>([]);

onInterested(event: CampusEvent) {
  this.favourites.update((ids) =>
    ids.includes(event.id)
      ? ids.filter((id) => id !== event.id)
      : [...ids, event.id]
  );
}

}
