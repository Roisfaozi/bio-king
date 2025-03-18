import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BasicArea from './basic-area';
import SplineArea from './spline-area';
import IrregularTimeSeries from './irregular-time-series';
import StackedAreaChart from './stacked-area';
import NullValueAreaChart from './null-value-area';
import GithubStyleChart from './github-style-chart';
import Link from 'next/link';
import GithubStyleCharts1 from './github-styles-charts1';
import NegativeAreaChart from './negative-areachart';
import Image from 'next/image';
import avatar7 from '@/public/images/avatar/avatar-7.jpg';

const AreaChartPage = () => {
  return (
    <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>Basic Area Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <BasicArea />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spline Area Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <SplineArea />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Area with Negative Values Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <NegativeAreaChart />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Area Chart - Github Style</CardTitle>
        </CardHeader>
        <CardContent>
          <GithubStyleChart />
          <div className='mt-2 flex items-center space-x-2 rtl:space-x-reverse'>
            <div className='h-12 w-12'>
              <Image
                className='h-full w-full object-cover'
                src={avatar7}
                alt=''
              />
            </div>
            <div className=''>
              <Link
                href='#'
                className='text-base font-medium capitalize text-card-foreground'
              >
                coder
              </Link>
              <div className='cmeta space-x-1 rtl:space-x-reverse'>
                <span className='commits text-base font-bold text-card-foreground'>
                  110
                </span>
                <span className='text-base font-medium text-card-foreground'>
                  commits
                </span>
              </div>
            </div>
          </div>
          <GithubStyleCharts1 />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Irregular Timeseries Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <IrregularTimeSeries />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Stacked Area Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <StackedAreaChart />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Area Chart With Null Values </CardTitle>
        </CardHeader>
        <CardContent>
          <NullValueAreaChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default AreaChartPage;
