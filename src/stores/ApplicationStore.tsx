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
    selectedDate: Date;
    selectedDateRange: { start: Date; end: Date };
}

export const useApplicationStore = create<State>()((set) => ({
    // implement get from local storage too...
    // Breadcrumbs for tracking folders
    breadcrumbs: [],
    timeInterval: 30,
    activeDate: new Date(),
    selectedDate: new Date(),
    // initialise to yesterday (start) and now (end)
    selectedDateRange: { start: new Date(), end: subDays(new Date(), 2) },
}));
