import { Card, CardContent } from '@/components/ui/card';
import { demoMenus } from './../data';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import ShowCaseContent from './showcase-content';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const ShowCase = () => {
  const [tab, setTab] = useState<string>('components');
  const menus = demoMenus || [];
  const [currentSubMenu, setCurrentSubMenu] = useState<any[]>(
    menus[0].child || [],
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const toggleSubMenu = (index: number) => {
    setActiveIndex(index);
    if (menus[index].child) {
      setCurrentSubMenu(menus[index].child);
    }
  };

  // filter is   currentSubMenu have  nested
  const currentSubMenuFiltered = currentSubMenu.filter((item) => !item.nested);
  //  filter only for  currentSubMenu nested
  const currentSubMenuWithNested = currentSubMenu.filter((item) => item.nested);

  return (
    <section className='bg-default-100 py-16 2xl:py-[100px]' id='elements'>
      <div className='container'>
        <div className='mx-auto max-w-[670px]'>
          <h2 className='mb-3 text-center text-xl font-semibold text-default-900 lg:text-xl 2xl:text-3xl 2xl:leading-[46px]'>
            Extensive UI <span className='text-primary'>Elements</span>
          </h2>
          <p className='text-center text-base leading-7 text-default-700'>
            DashTail provides a rich set of pre-built dashboards, layouts, apps,
            pages, charts, forms, tables, maps, etc. perfect for crafting
            advanced web applications.
          </p>
        </div>

        <div className='mt-12 flex flex-col gap-6 lg:flex-row'>
          <div className='w-full flex-none lg:w-[382px]'>
            <Card className='bg-background'>
              <CardContent className='px-0 py-6'>
                <ul className='space-y-5 xl:space-y-6'>
                  {menus?.map((item, i) => (
                    <li
                      key={`landing-page-tab-${i}`}
                      onClick={() => {
                        toggleSubMenu(i);
                      }}
                      className='flex cursor-pointer items-center px-6'
                    >
                      <div
                        className={cn(
                          'flex flex-1 items-center gap-3 text-default-600',
                          {
                            'text-primary': i === activeIndex,
                          },
                        )}
                      >
                        <item.icon className='h-6 w-6' />
                        <span
                          className={cn('text-base font-medium xl:text-xl')}
                        >
                          {item.title}
                        </span>
                      </div>
                      <div className='flex-none text-base'>
                        (0{item?.child?.length})
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className='flex-1'>
            {currentSubMenuWithNested.length > 0 && (
              <div>
                <Tabs
                  defaultValue={currentSubMenuWithNested[0].title}
                  className='inline-block w-full p-0'
                >
                  <TabsList className='w-full justify-start gap-10 rounded-md border-b-2 bg-background p-0 py-7'>
                    {currentSubMenuWithNested?.map((tab, index) => (
                      <TabsTrigger
                        key={`tab-${index}`}
                        value={tab.title}
                        className='relative px-3 capitalize transition duration-150 before:absolute before:-bottom-[30px] before:left-1/2 before:h-[2px] before:w-0 before:-translate-x-1/2 before:transition-all before:duration-150 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:before:w-full data-[state=active]:before:bg-primary'
                      >
                        <tab.icon className='mr-2 h-5 w-5' />
                        <span className='text-sm font-medium text-default-700'>
                          {tab.title}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {currentSubMenuWithNested?.map((tab, index) => (
                    <TabsContent key={`tab2-${index}`} value={tab.title}>
                      <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
                        {tab?.nested?.map((megaChild: any, mkindex: number) => (
                          <ShowCaseContent
                            content={megaChild}
                            key={`show-content-tab-${mkindex}`}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}
            {currentSubMenuFiltered.length > 0 && (
              <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
                {currentSubMenuFiltered?.map((content, j) => (
                  <ShowCaseContent
                    content={content}
                    key={`landing-content-${j}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;
