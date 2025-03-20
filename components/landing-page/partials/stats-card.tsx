import { motion } from 'framer-motion';

interface StatsCardProps {
  value: string;
  label: string;
  color?: 'primary' | 'secondary' | 'purple' | 'blue' | 'green' | 'pink';
  icon?: React.ReactNode;
  animationDelay?: number;
}

export function StatsCard({
  value,
  label,
  color = 'primary',
  icon,
  animationDelay = 0,
}: StatsCardProps) {
  // Define gradient styles based on color using a Map for better performance
  const gradientStyles = {
    primary: 'from-purple-600 to-fuchsia-600',
    secondary: 'from-blue-600 to-cyan-500',
    purple: 'from-purple-600 to-indigo-600',
    blue: 'from-blue-600 to-indigo-500',
    green: 'from-emerald-600 to-teal-500',
    pink: 'from-pink-600 to-rose-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animationDelay }}
      className='flex flex-col items-center justify-center space-y-3 rounded-xl border bg-card/50 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md'
    >
      {icon && (
        <div
          className={`rounded-full bg-gradient-to-r p-2 ${gradientStyles[color]} bg-opacity-10`}
        >
          {icon}
        </div>
      )}
      <div className='relative'>
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientStyles[color]} rounded-lg opacity-10 blur-lg`}
        />
        <div className='relative text-4xl font-bold'>
          <span
            className={`bg-gradient-to-r bg-clip-text text-transparent ${gradientStyles[color]}`}
          >
            {value}
          </span>
        </div>
      </div>
      <p className='font-medium text-muted-foreground'>{label}</p>
    </motion.div>
  );
}
