'use client';

import { HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function FAQSection() {
  const faqs = [
    {
      question: 'Can I try Bio King before committing to a paid plan?',
      answer:
        'Yes! Our Free plan allows you to try out the core features of Bio King without any commitment. We also offer a 14-day free trial on our Pro plan with no credit card required. You can upgrade to a paid plan anytime.',
    },
    {
      question: 'How do custom domains work?',
      answer:
        "Custom domains allow you to use your own branded domain for your bio link page. You'll need to own the domain and configure it to work with Bio King. Our Pro and Business plans include custom domain support. We provide step-by-step instructions to help you set up your domain.",
    },
    {
      question: 'Can I upgrade or downgrade my plan later?',
      answer:
        "You can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.",
    },
    {
      question:
        'Do you offer discounts for nonprofits or educational institutions?',
      answer:
        "Yes, we offer special pricing for nonprofits, educational institutions, and open-source projects. Please contact our sales team for more information and to verify your organization's status.",
    },
    {
      question: 'How do I get the verified badge?',
      answer:
        'The verified badge is available exclusively on our Business plan. Once you subscribe to the Business plan, you can apply for verification through your account settings. Our team will review your application and verify your identity.',
    },
    {
      question: 'Can I have multiple bio link pages?',
      answer:
        'Users on our Free and Pro plans can create one bio link page. Business plan subscribers can create multiple bio link pages, which is perfect for managing different brands or projects.',
    },
    {
      question: 'How secure is Bio King?',
      answer:
        'Bio King takes security seriously. All pages are served over HTTPS, and we offer additional security features like password protection on our paid plans. Our Business plan includes advanced security features like two-factor authentication and detailed access controls.',
    },
  ];

  return (
    <section className='relative w-full bg-muted/30 py-12 md:py-24 lg:py-32'>
      <div className='pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]'></div>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-10 md:gap-16 lg:grid-cols-2'>
          <div className='space-y-4'>
            <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
              <span>FAQ</span>
            </div>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
              Frequently Asked Questions
            </h2>
            <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
              Find answers to common questions about our service and pricing. If
              you don't see your question here, feel free to contact us.
            </p>
            <div className='pt-4'>
              <Link
                href='#'
                className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              >
                Contact Support
              </Link>
            </div>
          </div>
          <div className='grid gap-4 md:gap-8'>
            {faqs.map((faq, i) => (
              <div key={i} className='space-y-2'>
                <h3 className='flex items-center gap-2 text-xl font-bold'>
                  <HelpCircle className='h-5 w-5 text-primary' />
                  {faq.question}
                </h3>
                <p className='text-muted-foreground'>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
