import { create } from 'zustand';

type ErrorRecord = Record<string, Error | null>;
type E = Error | null;

interface AuthState {
    signInError: Error | null;
    signUpError: Error | null;

    setSignInError: (err: Error) => void;
    setSignUpError: (err: Error) => void;

    resetErrors: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    signInError: null,
    signUpError: null,

    setSignInError: (err) => set(() => ({ signInError: err })),

    setSignUpError: (err) => set(() => ({ signUpError: err })),

    resetErrors: () => set(() => ({ signInError: null, signUpError: null })),
}));
