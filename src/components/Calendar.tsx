import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import "../calendar.css";
import { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import { calculateDailyBalances } from '../utils/financeCalculations';
import { Balance, CalendarContent, Transaction } from '../types';
import { formatcurrency } from '../utils/formatting';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useTheme } from '@mui/material';
import { isSameMonth } from 'date-fns';

interface CalendarProps {
    monthlyTransactions: Transaction[],
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
    currentDay: string;
    today: string;
}

const Calendar = ({
    monthlyTransactions,
    setCurrentMonth,
    setCurrentDay,
    currentDay,
    today }: CalendarProps) => {
    const theme = useTheme()
    const events = [
        { title: 'Meeting', start: "2024-05-15", income: 300, expense: 200, balance: 100 }
    ]

    const backgroundEvent = {
        start: currentDay,
        display: "background",
        backgroundColor: theme.palette.incomeColor.light,
    }


    const dailyBalances = calculateDailyBalances(monthlyTransactions)


    const createcalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
        return Object.keys(dailyBalances).map((date) => {
            const { income, expense, balance } = dailyBalances[date]
            return {
                start: date,
                income: formatcurrency(income),
                expense: formatcurrency(expense),
                balance: formatcurrency(balance),
            }
        })
    }

    const calendarEvents = createcalendarEvents(dailyBalances);


    const rendereventContent = (eventInfo: EventContentArg) => {

        return (
            <div>
                <div className="money" id='event-income' >
                    {eventInfo.event.extendedProps.income}
                </div>
                <div className="money" id='event-expense' >
                    {eventInfo.event.extendedProps.expense}
                </div>
                <div className="money" id='event-balance' >
                    {eventInfo.event.extendedProps.balance}
                </div>
            </div>
        )
    }

    const handledateSet = (datesetInfo: DatesSetArg) => {
        const currentMonth = datesetInfo.view.currentStart;
        setCurrentMonth(currentMonth)
        const todayDate = new Date();
        if (isSameMonth(todayDate, currentMonth)) {
            setCurrentDay(today);
        }

    };

    const handleDateClick = (dateInfo: DateClickArg) => {

        setCurrentDay(dateInfo.dateStr);
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            events={[...calendarEvents, backgroundEvent]}
            eventContent={rendereventContent}
            datesSet={handledateSet}
            dateClick={handleDateClick}
        />
    )









}

export default Calendar
