import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { GradientText } from './gradient-text';

interface CTASectionProps {
  title: string;
  highlightedWord: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showEmailForm?: boolean;
  emailPlaceholder?: string;
  emailButtonText?: string;
}

export function CTASection({
  title,
  highlightedWord,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  showEmailForm = false,
  emailPlaceholder = 'Enter your email',
  emailButtonText = 'Sign Up Free',
}: CTASectionProps) {
  return (
    <section className='shadow-cta relative w-full overflow-hidden py-12 md:py-24 lg:py-32'>
      <div className='bg-gradient-to-rb pointer-events-none absolute inset-0 from-[#1a1a1a] to-primary'></div>
      <div className='container relative px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='scroll-fade-in max-w-[800px] space-y-2'>
            <h2 className='text-shadow text-3xl font-bold tracking-tighter sm:text-5xl'>
              {title.split(highlightedWord).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <GradientText animate className='text-glow'>
                      {highlightedWord}
                    </GradientText>
                  )}
                </span>
              ))}
            </h2>
            <p className='text-muted-foreground md:text-xl/relaxed'>
              {description}
            </p>
          </div>

          {showEmailForm && (
            <div className='scroll-fade-in mx-auto w-full max-w-sm space-y-2'>
              <form className='flex gap-2'>
                <input
                  type='email'
                  placeholder={emailPlaceholder}
                  className='flex h-10 w-full flex-1 rounded-md border border-input bg-background/80 px-3 py-2 text-sm ring-offset-background backdrop-blur-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                />
                <Button
                  type='submit'
                  className='shadow-button btn-gradient btn-hover-effect bg-gradient-primary hover:opacity-90'
                >
                  {emailButtonText}
                </Button>
              </form>
              <p className='text-xs text-muted-foreground'>
                No credit card required. Free plan includes unlimited links.
              </p>
            </div>
          )}

          <div className='scroll-fade-in mt-6 flex flex-col gap-2 min-[400px]:flex-row'>
            <Link
              href={primaryButtonLink}
              className={cn(
                'btn-hover-effect inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow-sm backdrop-blur-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'dark:hover:text-default-foreground dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
                'light:bg-default-100 light:hover:bg-default-200 light:text-default-foreground light:hover:text-primary',
              )}
            >
              {primaryButtonText}
            </Link>
            {secondaryButtonText && secondaryButtonLink && (
              <Link
                href={secondaryButtonLink}
                className={cn(
                  'inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium underline-offset-4 hover:underline',
                  'dark:text-muted-foreground',
                  'light:text-muted-foreground',
                )}
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
