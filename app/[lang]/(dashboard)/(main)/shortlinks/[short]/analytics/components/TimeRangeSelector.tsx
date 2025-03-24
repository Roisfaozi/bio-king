import { Button } from '@/components/ui/button';

interface TimeRangeSelectorProps {
  timeRange: string;
  onChange: (range: string) => void;
}

export default function TimeRangeSelector({
  timeRange,
  onChange,
}: TimeRangeSelectorProps) {
  const timeRangeOptions = [
    { value: '30', label: '1 Bulan' },
    { value: '60', label: '2 Bulan' },
    { value: '90', label: '3 Bulan' },
    { value: '365', label: '1 Tahun' },
  ];

  return (
    <div className='flex gap-2'>
      {timeRangeOptions.map((option) => (
        <Button
          key={option.value}
          color={timeRange === option.value ? 'primary' : 'default'}
          variant='outline'
          size='sm'
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
