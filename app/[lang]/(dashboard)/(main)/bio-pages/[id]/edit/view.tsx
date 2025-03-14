'use client';
import EditBioForm from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/edit-bio/edit-bio-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BioPageResponse } from '@/models/bio-page-response';

interface UpdateBioPageFormProps {
  id: string;
  trans: any;
  data: BioPageResponse;
}

export default function UpdateBioPageForm({
  id,
  trans,
  data,
}: UpdateBioPageFormProps) {
  return (
    <div className='space-y-6'>
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Edit Bio Page</CardTitle>
            <CardDescription>
              Edit your bio page with custom information and links. When you
              save the changes, it will be live and visible to everyone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditBioForm bioPage={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
