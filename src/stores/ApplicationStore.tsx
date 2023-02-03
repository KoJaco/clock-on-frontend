import { subDays } from 'date-fns';
import { create } from 'zustand';

/**
 * Store is for tracking client-side only data.
 *
 */

export interface State {
    breadcrumbs: { id: string; title: string; uniquePath: string }[];
    timeInterval: 15 | 30 | 45 | 60;
    activeDate: Date;
    setActiveDate: (date: Date) => void;
    actingOnDateRange: boolean;
    setActingOnDateRange: (value: boolean) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    selectedDateRange: { start: Date; end: Date };
    setSelectedDateRange: (dateRange: { start: Date; end: Date }) => void;
}

export const useApplicationStore = create<State>()((set) => ({
    // implement get from local storage too...
    // Breadcrumbs for tracking folders
    breadcrumbs: [],
    timeInterval: 15,
    activeDate: new Date(),
    actingOnDateRange: false,
    setActingOnDateRange: (value: boolean) => set({ actingOnDateRange: value }),
    setActiveDate: (date: Date) => set({ activeDate: date }),
    selectedDate: new Date(),
    setSelectedDate: (date: Date) => set({ selectedDate: date }),
    // initialise to yesterday (start) and now (end)
    selectedDateRange: { start: new Date(), end: subDays(new Date(), 2) },
    setSelectedDateRange: (dateRange: { start: Date; end: Date }) =>
        set({ selectedDateRange: dateRange }),
}));
