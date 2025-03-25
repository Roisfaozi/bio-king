import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterSectionProps {
  filters: {
    source: string | null;
    shortcode: string | null;
    showFilters: boolean;
    isAdmin?: boolean;
  };
  shortcodeInput: string;
  onSourceChange: (value: string) => void;
  onShortcodeInputChange: (value: string) => void;
  onShortcodeFilter: () => void;
  onResetFilters: () => void;
}

export function FilterSection({
  filters,
  shortcodeInput,
  onSourceChange,
  onShortcodeInputChange,
  onShortcodeFilter,
  onResetFilters,
}: FilterSectionProps) {
  if (!filters.showFilters) return null;

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle className='text-lg'>Filter Data</CardTitle>
        <CardDescription>
          Filter data berdasarkan kriteria tertentu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='source'>Type Halaman</Label>
            <Select
              onValueChange={onSourceChange}
              defaultValue={filters.source || 'all'}
            >
              <SelectTrigger id='source'>
                <SelectValue placeholder='Pilih tipe halaman' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipe Halaman</SelectLabel>
                  <SelectItem value='all'>Semua Halaman</SelectItem>
                  <SelectItem value='tinder'>Tinder</SelectItem>
                  <SelectItem value='vsco'>VSCO</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='shortcode'>Shortcode</Label>
            <div className='flex space-x-2'>
              <Input
                id='shortcode'
                placeholder='Masukkan shortcode'
                value={shortcodeInput}
                onChange={(e) => onShortcodeInputChange(e.target.value)}
              />
              <Button onClick={onShortcodeFilter}>Filter</Button>
            </div>
          </div>
        </div>

        <div className='mt-4 flex justify-end'>
          <Button variant='outline' onClick={onResetFilters}>
            Reset Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
