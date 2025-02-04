import SelectingLayers from '@/app/[lang]/(dashboard)/(main)/analytics/components/maps/selecting-layers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Maps = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Selecting Layers</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectingLayers />
        </CardContent>
      </Card>
    </div>
  );
};

export default Maps;
