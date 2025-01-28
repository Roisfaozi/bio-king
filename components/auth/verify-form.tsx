'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { SiteLogo } from '../svg';

const VerfiyForm = () => {
  const totalOtpField = 6;
  const otpArray: string[] = Array.from({ length: totalOtpField }, () => '');
  const [otp, setOtp] = useState<string[]>(otpArray);
  const otpFields = Array.from({ length: totalOtpField }, (_, index) => index);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value.length === 1 && index < totalOtpField - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && otp[index] === '' && index > 0) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = '';
        return newOtp;
      });
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === 'ArrowRight' && index < totalOtpField - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);
    setOtp(otpArray);
    inputRefs.current[0]?.focus();
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <div className='w-full py-5 md:w-[480px]'>
      <Link href='/dashboard' className='inline-block'>
        <SiteLogo className='h-10 w-10 text-primary 2xl:h-14 2xl:w-14' />
      </Link>
      <div className='mt-6 text-2xl font-bold text-default-900 2xl:mt-8 2xl:text-3xl'>
        Two Factor Verification
      </div>
      <div className='mt-2 text-base leading-6 text-default-600 2xl:text-lg'>
        Enter the 6 figure confirmation code shown on the email
      </div>
      <form className='mt-8'>
        <div className='flex flex-wrap gap-1 lg:gap-6'>
          {otpFields.map((index) => (
            <Input
              key={`otp-code-${index}`}
              type='text'
              id={`otp${index}`}
              name={`otp${index}`}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              maxLength={1}
              className='h-10 w-10 rounded border-default-300 text-center text-2xl font-medium text-default-900 sm:h-16 sm:w-[60px]'
              ref={(ref) => {
                inputRefs.current[index] = ref; // Perbaikan di sini
              }}
            />
          ))}
        </div>
        <div className='mt-6'>
          <Button
            type='button'
            className='w-full'
            size='lg'
            onClick={handleSubmit}
            disabled={!isOtpComplete}
          >
            Verify Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerfiyForm;
