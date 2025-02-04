'use client';

import { VectorMap } from '@south-paw/react-vector-maps';
import { useState } from 'react';
import world from './worldmap.json';

const SelectingLayers = ({ height = 250 }: { height?: number }) => {
  const [selected, setSelected] = useState<number[]>([]);

  const onClick = (event: React.MouseEvent<SVGPathElement>) => {
    const target = event.currentTarget as SVGPathElement;
    const id = target.getAttribute('id');
    if (id) {
      const numericId = parseInt(id, 10);
      setSelected((prevSelected) =>
        prevSelected.includes(numericId)
          ? prevSelected.filter((sid) => sid !== numericId)
          : [...prevSelected, numericId],
      );
    }
  };
  return (
    <div>
      <div className={`h-[ w-full${height}px]`}>
        <VectorMap
          {...world}
          layerProps={{ onClick }}
          className='dashtail-codeVmapWarning h-full w-full object-cover'
        />
      </div>
      <div className='text-center'>
        <p className='text-sm font-medium text-card-foreground'>Selected:</p>
        <pre className='text-sm font-medium text-card-foreground'>
          {JSON.stringify(selected, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default SelectingLayers;
