interface StatsCardProps {
  number: string;
  label: string;
  color?: 'primary' | 'secondary' | 'purple' | 'blue' | 'green' | 'pink';
}

export function StatsCard({
  number,
  label,
  color = 'primary',
}: StatsCardProps) {
  // Define gradient styles based on color
  const gradientStyles = {
    primary: 'from-purple-600 to-fuchsia-600',
    secondary: 'from-blue-600 to-cyan-500',
    purple: 'from-purple-600 to-indigo-600',
    blue: 'from-blue-600 to-indigo-500',
    green: 'from-emerald-600 to-teal-500',
    pink: 'from-pink-600 to-rose-500',
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-2 rounded-xl border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md'>
      <div className='relative'>
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientStyles[color]} rounded-lg opacity-10 blur-lg`}
        ></div>
        <div className='relative text-4xl font-bold'>
          <span
            className={`bg-gradient-to-r bg-clip-text text-transparent ${gradientStyles[color]}`}
          >
            {number}
          </span>
        </div>
      </div>
      <p className='font-medium text-muted-foreground'>{label}</p>
    </div>
  );
}
