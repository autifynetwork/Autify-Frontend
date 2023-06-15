import Image from 'next/image';
// @ts-ignore
import DatePicker from 'react-datepicker';

export default function DateSelector({ label, startDate, setStartDate }: any) {
    return (
        <div className="w-full flex flex-col justify-end">
            <p className="text-dark-700 font-medium mb-2 text-start">{label}</p>
            <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-4 flex items-center z-[20]">
                    <Image src="/calendar.png" width={14} height={14} alt="calendar" />
                </div>
                <DatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    maxDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    fixedHeight
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    disabledKeyboardNavigation
                    showPopperArrow={false}
                />
            </div>
        </div>
    );
}
