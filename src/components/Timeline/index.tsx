import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { IoCreateOutline } from 'react-icons/io5';
import { CgCalendarDates } from 'react-icons/cg';
import { MdOutlineTimer } from 'react-icons/md';
import {
    eachHourOfInterval,
    eachMinuteOfInterval,
    addMinutes,
    subDays,
    differenceInDays,
    startOfDay,
    differenceInHours,
} from 'date-fns';

import Calendar from '../Calendar';
import { useApplicationStore } from '@/stores/ApplicationStore';

type TimelineProps = {
    showCalendar: boolean;
};

const Timeline = ({ showCalendar, ...props }: TimelineProps) => {
    // Local
    const container = useRef<HTMLDivElement>(null);
    const containerNav = useRef<HTMLDivElement>(null);
    const containerOffset = useRef<HTMLDivElement>(null);

    // Global
    const {
        timeInterval,
        activeDate,
        selectedDate,
        selectedDateRange,
        actingOnDateRange,
    } = useApplicationStore();

    // Memoized array of dates between start and end dates.
    const times = useMemo(() => {
        // initialise array of dates with start date
        const times: Date[] = [selectedDateRange.start];
        // how many hours between the start and end dates?

        const minutesInHour = 60;

        // multiply hourly intervals by our day range*hours in day
        const intervals =
            (minutesInHour / timeInterval) *
            differenceInHours(
                startOfDay(selectedDateRange.start),
                selectedDateRange.end
            );

        for (let i = 1; i < intervals; i++) {
            times.push(addMinutes(times[i - 1], timeInterval));
        }

        return times;
    }, [timeInterval, selectedDateRange]);

    useEffect(() => {
        if (
            container.current &&
            containerNav.current &&
            containerOffset.current
        ) {
            // Set the container scroll position based on the current time.
            const currentMinute = new Date().getHours() * 60;
            container.current.scrollTop =
                ((container.current.scrollHeight -
                    containerNav.current.offsetHeight -
                    containerOffset.current.offsetHeight) *
                    currentMinute) /
                1440;
        }
    }, []);

    return (
        <>
            {/* Start TaskBar */}
            {!showCalendar && (
                <div className="mb-2 -mt-8 flex w-full items-center justify-start font-semibold text-slate-700">
                    {/* Access 'activeDate' from global state or cached with React Query */}
                    {new Date().toLocaleDateString('en-Uk', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </div>
            )}

            {/* End TaskBar */}
            <div
                className={clsx(
                    'flex flex-auto overflow-hidden rounded-md border border-slate-300 bg-white drop-shadow-md',
                    actingOnDateRange ? 'h-auto' : 'h-[95%] overflow-hidden'
                )}
            >
                <div
                    ref={container}
                    className={clsx(
                        'flex flex-auto flex-col overflow-x-hidden scrollbar-rounded',
                        actingOnDateRange
                            ? 'overflow-y-hidden'
                            : 'overflow-y-auto'
                    )}
                >
                    <div
                        ref={containerNav}
                        className="sticky top-0 z-10 bg-white"
                    >
                        {/* Start Calendar */}

                        {(showCalendar || actingOnDateRange) && <Calendar />}

                        {/* End Calendar */}
                    </div>
                    {!actingOnDateRange && (
                        <div className="flex w-full flex-auto">
                            <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
                            <div className="grid flex-auto grid-cols-1 grid-rows-1">
                                {/* Horizontal lines */}
                                <div className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 auto-rows-1fr">
                                    <div
                                        ref={containerOffset}
                                        className="row-end-1 h-7"
                                    ></div>

                                    {times.map((time, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <div>
                                                    <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                                        {time.toLocaleTimeString(
                                                            'en-UK',
                                                            {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                                <div />
                                            </Fragment>
                                        );
                                    })}
                                </div>

                                {/* Events */}
                                <ol
                                    className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                                    style={{
                                        gridTemplateRows:
                                            '1.75rem repeat(288, minmax(0, 1fr)) auto',
                                    }}
                                >
                                    <li
                                        className="relative mt-px flex"
                                        style={{ gridRow: '74 / span 12' }}
                                    >
                                        <a
                                            href="#"
                                            className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                                        >
                                            <p className="order-1 font-semibold text-blue-700">
                                                Breakfast
                                            </p>
                                            <p className="text-blue-500 group-hover:text-blue-700">
                                                <time dateTime="2022-01-22T06:00">
                                                    6:00 AM
                                                </time>
                                            </p>
                                        </a>
                                    </li>
                                    <li
                                        className="relative mt-px flex"
                                        style={{ gridRow: '92 / span 30' }}
                                    >
                                        <a
                                            href="#"
                                            className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                                        >
                                            <p className="order-1 font-semibold text-pink-700">
                                                Flight to Paris
                                            </p>
                                            <p className="order-1 text-pink-500 group-hover:text-pink-700">
                                                John F. Kennedy International
                                                Airport
                                            </p>
                                            <p className="text-pink-500 group-hover:text-pink-700">
                                                <time dateTime="2022-01-22T07:30">
                                                    7:30 AM
                                                </time>
                                            </p>
                                        </a>
                                    </li>
                                    <li
                                        className="relative mt-px flex"
                                        style={{ gridRow: '134 / span 18' }}
                                    >
                                        <a
                                            href="#"
                                            className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100"
                                        >
                                            <p className="order-1 font-semibold text-indigo-700">
                                                Sightseeing
                                            </p>
                                            <p className="order-1 text-indigo-500 group-hover:text-indigo-700">
                                                Eiffel Tower
                                            </p>
                                            <p className="text-indigo-500 group-hover:text-indigo-700">
                                                <time dateTime="2022-01-22T11:00">
                                                    11:00 AM
                                                </time>
                                            </p>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Timeline;
