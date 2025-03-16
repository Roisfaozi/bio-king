interface AnalyticsLayoutProps {
  children: React.ReactNode;
}

const AnalyticsLayout = ({ children }: AnalyticsLayoutProps) => {
  return <div className='container mx-auto py-6'>{children}</div>;
};

export default AnalyticsLayout;
