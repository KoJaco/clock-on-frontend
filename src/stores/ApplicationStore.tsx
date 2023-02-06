import { subDays } from 'date-fns';
import { create } from 'zustand';

/**
 * Store is for tracking client-side only data.
 *
 */

export interface State {
    breadcrumbs: { id: string; title: string; uniquePath: string }[];
    timeInterval: 15 | 30 | 45 | 60;
    setTimeInterval: (value: 15 | 30 | 45 | 60) => void;
    activeDate: Date;
    setActiveDate: (date: Date) => void;
    // used in Timeline, Slideover, and Calendar components
    actingOnDateRange: boolean;
    setActingOnDateRange: (value: boolean) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    selectedDateRange: { start: Date | null; end: Date | null };
    setSelectedDateRange: (dateRange: {
        start: Date | null;
        end: Date | null;
    }) => void;
}

export const useApplicationStore = create<State>()((set) => ({
    // implement get from local storage too...
    // Breadcrumbs for tracking folders
    breadcrumbs: [],
    timeInterval: 30,
    setTimeInterval: (value: 15 | 30 | 45 | 60) => set({ timeInterval: value }),
    activeDate: new Date(),
    actingOnDateRange: false,
    setActingOnDateRange: (value: boolean) => set({ actingOnDateRange: value }),
    setActiveDate: (date: Date) => set({ activeDate: date }),
    selectedDate: new Date(),
    setSelectedDate: (date: Date) => set({ selectedDate: date }),
    // initialise to today (start) and 2 days ago (end)
    selectedDateRange: { start: new Date(), end: subDays(new Date(), 1) },
    setSelectedDateRange: (dateRange: {
        start: Date | null;
        end: Date | null;
    }) => set({ selectedDateRange: dateRange }),
}));
