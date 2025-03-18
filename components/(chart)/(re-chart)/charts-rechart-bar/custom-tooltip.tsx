const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload) {
    return (
      <div className='space-x-2 rounded-md bg-slate-900 p-3 text-primary-foreground rtl:space-x-reverse'>
        <span>{`${payload[0].name}`}</span>
        <span>:</span>
        <span>{`${payload[0].value}%`}</span>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
