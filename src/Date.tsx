import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState(new Date());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY < 0) {
        setMonth(current => new Date(current.getFullYear(), current.getMonth() - 1, 1));
      } else if (event.deltaY > 0) {
        setMonth(current => new Date(current.getFullYear(), current.getMonth() + 1, 1));
      }
    };

    const div = containerRef.current;
    div?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      div?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        month={month}
        classNames={{
          ...classNames,
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-4',
          caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'text-sm font-medium',
          nav: 'space-x-1 flex items-center',
          nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-none outline-none',
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
          row: 'flex w-full mt-2',
          cell: 'relative p-0 text-center text-sm',
          day: 'h-8 w-8 p-0 font-normal',
          // Add more classNames configurations if needed...
        }}
        {...props}
      />
      <div className="navigation">
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
