'use client';
import { useThemeStore } from '@/store';
import { useTheme } from 'next-themes';
import { themes } from '@/config/thems';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ScatterChart,
  Scatter,
} from 'recharts';
import CustomTooltip from './custom-tooltip';
interface DataPoint {
  x: number;
  y: number;
  z: number;
}
const data01: DataPoint[] = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];
const data02: DataPoint[] = [
  { x: 300, y: 300, z: 200 },
  { x: 400, y: 500, z: 260 },
  { x: 200, y: 700, z: 400 },
  { x: 340, y: 350, z: 280 },
  { x: 560, y: 500, z: 500 },
  { x: 230, y: 780, z: 200 },
  { x: 500, y: 400, z: 200 },
  { x: 300, y: 500, z: 260 },
  { x: 240, y: 300, z: 400 },
  { x: 320, y: 550, z: 280 },
  { x: 500, y: 400, z: 500 },
  { x: 420, y: 280, z: 200 },
];

const MultipleYAxesChart = ({ height = 300 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  return (
    <ResponsiveContainer width='100%' height={height}>
      <ScatterChart height={height}>
        <CartesianGrid
          stroke={`hsl(${
            theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartGird
          })`}
          strokeDasharray='3 3'
          vertical={false}
        />
        <XAxis
          type='number'
          dataKey='x'
          name='stature'
          unit='cm'
          tick={{
            fill: `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`,
            fontSize: '12px',
          }}
          tickLine={false}
          stroke={`hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartGird})`}
          axisLine={false}
        />
        <YAxis
          type='number'
          dataKey='y'
          name='weight'
          unit='kg'
          tick={{
            fill: `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`,
            fontSize: '12px',
          }}
          tickLine={false}
          stroke={`hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartGird})`}
          yAxisId='left'
        />
        <YAxis
          type='number'
          dataKey='y'
          name='weight'
          unit='kg'
          tick={{
            fill: `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`,
            fontSize: '12px',
          }}
          tickLine={false}
          stroke={`hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartGird})`}
          yAxisId='right'
          orientation='right'
        />
        <Tooltip content={<CustomTooltip />} />
        <Scatter
          yAxisId='left'
          name='A school'
          data={data01}
          fill={`hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`}
        />
        <Scatter
          yAxisId='right'
          name='A school'
          data={data02}
          fill={`hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default MultipleYAxesChart;
