import React, { useState } from 'react';
import { BsFacebook, BsApple, BsGoogle } from 'react-icons/bs';

import { useAuthStore } from '@/stores/AuthStore';

type SignInProps = {
    signIn: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateFormType: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SignIn = ({
    signIn,
    updateFormState,
    updateFormType,
    ...props
}: SignInProps) => {
    const { signInError } = useAuthStore();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        signIn();
    }

    return (
        <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <button
                    type="button"
                    name="signUp"
                    onClick={(e) => {
                        updateFormType(e);
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    start your 14-day free trial
                </button>
            </p>

            <div className="mt-8">
                <div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            Sign in with
                        </p>

                        <div className="mt-1 grid grid-cols-3 gap-3">
                            <div>
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                >
                                    <span className="sr-only">
                                        Sign in with Facebook
                                    </span>
                                    <BsFacebook className="h-5 w-5" />
                                </button>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                >
                                    <span className="sr-only">
                                        Sign in with Google
                                    </span>
                                    <BsGoogle className="h-5 w-5" />
                                </button>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                >
                                    <span className="sr-only">
                                        Sign in with Apple
                                    </span>
                                    <BsApple className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex">
                        <div className="w-full flex justify-center text-sm">
                            <span className="w-full border-b border-slate-300 -translate-y-2"></span>
                            <span className="text-center w-full bg-transparent px-2 text-gray-500">
                                Or continue with
                            </span>
                            <span className="w-full border-b border-slate-300 -translate-y-2"></span>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <form
                        className="space-y-6"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        e.persist();
                                        updateFormState(e);
                                    }}
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => {
                                        e.persist();
                                        updateFormState(e);
                                    }}
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {signInError && (
                            <span className="text-red-500 text-sm">
                                {signInError.message}
                            </span>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="rememberMe"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <button
                                    type="button"
                                    name="forgotPassword"
                                    onClick={(e) => {
                                        updateFormType(e);
                                    }}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* <input
                                name="username"
                                onChange={(e) => {
                                    e.persist();
                                    updateFormState(e);
                                }}
                                placeholder="username"
                            />
            <input
                type="password"
                name="password"
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
                placeholder="password"
            /> */}
            {/* <button onClick={signIn}>Sign In</button> */}
        </div>
    );
};

export default SignIn;
