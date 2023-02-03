import { create } from 'zustand';

/**
 * Store is for tracking state variables related to the UI side of the application.
 *
 */

export interface State {
    showSlideover: boolean;
    setShowSlideover: (value: boolean) => void;

    // slideover left vs slideover right
}

export const useUIControlStore = create<State>()((set) => ({
    // implement get from local storage too...
    showSlideover: false,
    setShowSlideover: (value) => {
        set(() => ({ showSlideover: value }));
    },
}));
