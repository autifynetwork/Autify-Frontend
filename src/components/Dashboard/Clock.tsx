import { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12' in 12-hour time

        const timeIn12HourFormat = `${hours}:${minutes} ${ampm}`;

        setTime(timeIn12HourFormat);

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[now.getDay()];
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const monthName = months[now.getMonth()];
        const dayOfMonth = now.getDate();

        const dateInCustomFormat = ` ${dayOfWeek}, ${monthName} ${dayOfMonth}`;

        setDate(dateInCustomFormat);
    }, []);

    return (
        <div className="w-fit h-full block align-middle px-4 py-2 bg-primary-300 text-[#3072ED] rounded-full text-sm">
            <i className="fa-solid fa-clock text-primary-500"></i>
            <span className="ml-2">{time}</span>
            <span className="ml-3 mr-2">|</span>
            <span>{date}</span>
        </div>
    );
};

export default Clock;
