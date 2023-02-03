import { create } from 'zustand';

/**
 * Store is for tracking main application logic
 *
 */

export interface State {
    breadcrumbs: { id: string; title: string; uniquePath: string }[];
}

export const useApplicationStore = create<State>()((set) => ({
    // implement get from local storage too...
    // Breadcrumbs for tracking folders
    breadcrumbs: [],
}));
