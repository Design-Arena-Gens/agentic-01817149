export type Platform = 'Google' | 'MakeMyTrip' | 'Booking.com' | 'TripAdvisor';

export function PlatformIcon({ platform }: { platform: Platform }) {
  const common = 'inline-flex items-center gap-1 text-xs text-slate-300';
  switch (platform) {
    case 'Google':
      return <span className={common}><span className="h-2.5 w-2.5 rounded-full bg-[#34A853]"></span>Google</span>;
    case 'MakeMyTrip':
      return <span className={common}><span className="h-2.5 w-2.5 rounded-full bg-[#E43D30]"></span>MMT</span>;
    case 'Booking.com':
      return <span className={common}><span className="h-2.5 w-2.5 rounded-full bg-[#003580]"></span>Booking</span>;
    case 'TripAdvisor':
      return <span className={common}><span className="h-2.5 w-2.5 rounded-full bg-[#34E0A1]"></span>TripAdvisor</span>;
    default:
      return <span className={common}>Other</span>;
  }
}
