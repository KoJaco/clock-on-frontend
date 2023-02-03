import React, { useCallback, useState } from 'react';
import {
    format,
    startOfWeek,
    addDays,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    isSameMonth,
    isSameDay,
    subMonths,
    addMonths,
    subWeeks,
    addWeeks,
    isSameWeek,
} from 'date-fns';

import {
    BsArrowsCollapse,
    BsArrowsExpand,
    BsFillCheckCircleFill,
} from 'react-icons/bs';
import clsx from 'clsx';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import Cell from './Cell';

import { useApplicationStore } from '@/stores/ApplicationStore';

const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type CalendarDaysProps = {
    timePeriod: 'month' | 'week';
    year: number;
};

const Calendar = () => {
    const {
        selectedDate,
        setSelectedDate,
        activeDate,
        setActiveDate,
        actingOnDateRange,
        setActingOnDateRange,
        setSelectedDateRange,
    } = useApplicationStore();

    const [isMonthlyView, setIsMonthlyView] = useState(false);

    const generateDatesForCurrentWeek = useCallback(
        (date: Date, selectedDate: Date, activeDate: Date) => {
            let currentDate = date;
            const week = [];
            for (let day = 0; day < 7; day++) {
                const cloneDate = currentDate;
                week.push(
                    <button
                        key={currentDate.toLocaleDateString()}
                        className={clsx(
                            'py-1 hover:bg-gray-100 focus:z-10 rounded-sm bg-white',
                            isSameMonth(currentDate, activeDate)
                                ? 'bg-white'
                                : 'bg-slate-50 py-1.5 text-gray-400',
                            isSameDay(currentDate, selectedDate) &&
                                'font-semibold text-white',

                            isSameDay(currentDate, selectedDate) &&
                                isSameDay(currentDate, new Date()) &&
                                'text-white',
                            isSameDay(currentDate, new Date()) &&
                                !isSameDay(currentDate, selectedDate) &&
                                'font-semibold text-indigo-600'
                        )}
                        onClick={() => {
                            setSelectedDate(cloneDate);
                        }}
                    >
                        <time
                            dateTime={currentDate.toLocaleDateString()}
                            className={clsx(
                                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                isSameDay(currentDate, selectedDate) &&
                                    isSameDay(currentDate, new Date()) &&
                                    'bg-indigo-600',
                                isSameDay(currentDate, selectedDate) &&
                                    !isSameDay(currentDate, new Date()) &&
                                    'bg-gray-900'
                            )}
                        >
                            {format(currentDate, 'd')}
                        </time>
                    </button>
                );
                currentDate = addDays(currentDate, 1);
            }
            return <>{week}</>;
        },
        [setSelectedDate]
    );

    const getWeekDates = useCallback(() => {
        // if our selected date isn't in the same month as active date, make our weekly view the start of that month with the first date selected
        const allDaysInWeek = [];

        const currentDate = startOfWeek(activeDate);

        allDaysInWeek.push(
            generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
        );

        return (
            <div className="isolate grid grid-cols-7 gap-0 rounded-md border-b bg-transparent text-sm">
                {allDaysInWeek}
            </div>
        );
    }, [activeDate, selectedDate, generateDatesForCurrentWeek]);

    const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);

        let currentDate = startDate;

        const allWeeks = [];

        while (currentDate <= endDate) {
            allWeeks.push(
                generateDatesForCurrentWeek(
                    currentDate,
                    selectedDate,
                    activeDate
                )
            );
            currentDate = addDays(currentDate, 7);
        }

        return (
            <div className="isolate grid grid-cols-7 gap-0 rounded-md  bg-transparent text-sm">
                {/* <div className="isolate grid grid-cols-7 gap-px rounded-md bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200"> */}
                {allWeeks}
            </div>
        );
    };

    return (
        <div
            className={
                actingOnDateRange ? 'shadow-lg scale-105 p-2' : 'border-b'
            }
        >
            <div className="mb-4 flex items-center justify-between text-center text-slate-800">
                {/* Month year */}
                <div className="ml-4 flex font-semibold text-slate-700">
                    {format(activeDate, 'MMMM yyyy')}
                </div>
                <div className="mx-auto flex items-center gap-x-2">
                    {/* previous */}
                    <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center px-2 text-gray-400 hover:text-gray-500"
                        onClick={() => {
                            isMonthlyView
                                ? setActiveDate(subMonths(activeDate, 1))
                                : setActiveDate(subWeeks(activeDate, 1));
                        }}
                    >
                        <span className="sr-only">Previous month</span>
                        <MdOutlineChevronLeft
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        id="today-button"
                        className="text-sm text-gray-400 hover:text-slate-700"
                        onClick={() => {
                            setSelectedDate(new Date());
                            setActiveDate(new Date());
                        }}
                    >
                        Today
                    </button>
                    {/* next */}
                    <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center px-2 text-gray-400 hover:text-gray-500"
                        onClick={() => {
                            isMonthlyView
                                ? setActiveDate(addMonths(activeDate, 1))
                                : setActiveDate(addWeeks(activeDate, 1));
                        }}
                    >
                        <span className="sr-only">Next month</span>
                        <MdOutlineChevronRight
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="ml-auto mr-4 flex items-center gap-x-4">
                    <button
                        id="date-range"
                        className=" text-gray-400 hover:text-slate-700"
                        onClick={() => {
                            isMonthlyView && setActiveDate(selectedDate);
                            setIsMonthlyView(!isMonthlyView);
                        }}
                    >
                        {isMonthlyView ? (
                            <BsArrowsCollapse className="h-4 w-4" />
                        ) : (
                            <BsArrowsExpand className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-gray-500">
                {daysOfTheWeek.map((day, index) => {
                    return <Cell key={index}>{day}</Cell>;
                })}
            </div>

            {/* Calendar dates element */}
            {isMonthlyView ? getDates() : getWeekDates()}
        </div>
    );
};

export default Calendar;
