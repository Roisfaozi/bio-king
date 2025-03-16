'use client';
import { useState } from 'react';
import { RecentActivities, RecentActivityType } from '@/models/click-resonse';
import ListView from '@/app/[lang]/(dashboard)/(main)/dashboard/components/list-view';

interface ActivityListProps {
  activity: RecentActivities;
}

export default function ActivityList({ activity }: ActivityListProps) {
  const [selectedItem, setSelectedItem] = useState<RecentActivityType | null>(
    null,
  );

  return (
    <ListView
      activity={activity}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />
  );
}
