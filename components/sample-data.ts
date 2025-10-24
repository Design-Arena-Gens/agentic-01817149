import type { Platform } from './platform-icon';

export type ReviewItem = {
  id: string;
  platform: Platform;
  guest: string;
  rating: number; // 1-5
  text: string;
  date: string; // e.g., 2025-10-10
  roomType: string;
  stayLength: number;
};

export const sampleReviews: ReviewItem[] = [
  {
    id: 'r1',
    platform: 'Google',
    guest: 'Priya S.',
    rating: 5,
    date: '2025-10-10',
    roomType: 'Deluxe King',
    stayLength: 2,
    text: 'Absolutely loved the hospitality! The staff went out of their way to arrange an early check-in and the breakfast spread had great South Indian options. The room was spotless and the view of Marine Drive was stunning.'
  },
  {
    id: 'r2',
    platform: 'MakeMyTrip',
    guest: 'Rahul K.',
    rating: 3,
    date: '2025-10-08',
    roomType: 'Superior Twin',
    stayLength: 1,
    text: 'Location is excellent but room service took too long. Check-in was smooth though. Could improve on the AC noise.'
  },
  {
    id: 'r3',
    platform: 'Booking.com',
    guest: 'Ananya D.',
    rating: 4,
    date: '2025-10-05',
    roomType: 'Club Room',
    stayLength: 3,
    text: 'Comfortable stay overall. The rooftop restaurant had delicious biryani and the pool was clean. Minor issue with Wi-Fi speed during evening hours.'
  },
  {
    id: 'r4',
    platform: 'TripAdvisor',
    guest: 'Vikram P.',
    rating: 2,
    date: '2025-10-01',
    roomType: 'Standard',
    stayLength: 2,
    text: 'Disappointed with housekeeping. Found stains on bedsheets on day 1 and had to call twice to get it changed. Reception was polite but issue should not have occurred at this price.'
  },
  {
    id: 'r5',
    platform: 'Google',
    guest: 'Neha L.',
    rating: 4,
    date: '2025-09-30',
    roomType: 'Suite',
    stayLength: 1,
    text: 'Great value for money. Loved the masala chai at breakfast. Slight delay during checkout as there was only one counter open.'
  }
];
