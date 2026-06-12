import type { Team } from '../data/teams';

export default function Flag({ team, className = 'w-6' }: { team: Team; className?: string }) {
  return (
    <img
      src={team.flag}
      alt={`${team.name} flag`}
      loading="lazy"
      className={`inline-block shrink-0 rounded-[3px] border border-slate-700/50 object-cover ${className}`}
    />
  );
}
