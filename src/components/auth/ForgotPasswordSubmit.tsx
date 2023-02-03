import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type ForgotPasswordSubmitProps = {
    forgotPasswordSubmit: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateFormType: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ForgotPasswordSubmit = (props: ForgotPasswordSubmitProps) => {
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.forgotPasswordSubmit();
    }

    return (
        <div className="mt-6">
            <h2 className="mt-6 text-xl font-bold tracking-tight text-slate-700">
                Password Reset
            </h2>

            <p className="mt-2 mb-6 text-sm">
                {`Please enter the verification code sent to _______, and
                enter a new password.`}
            </p>
            <div className="mb-6 flex">
                <span className="w-full border-b border-slate-300 -translate-y-2"></span>
            </div>

            <form
                className="space-y-6"
                onSubmit={(e) => handleSubmit(e)}
                autoComplete="off"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirmation Code
                    </label>
                    <div className="mt-1">
                        <input
                            id="confirmationCode"
                            name="confirmationCode"
                            type="text"
                            placeholder="Code"
                            onChange={(e) => {
                                e.persist();
                                props.updateFormState(e);
                            }}
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-end">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <button
                            type="button"
                            className="flex ml-auto text-slate-700 opacity-75 hover:opacity-100"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <AiOutlineEye />
                            ) : (
                                <AiOutlineEyeInvisible />
                            )}
                        </button>
                    </div>

                    <div className="mt-1 flex">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            onChange={(e) => {
                                e.persist();
                                props.updateFormState(e);
                            }}
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="flex gap-x-10">
                    <button
                        name="signIn"
                        type="button"
                        className="flex w-full justify-center rounded-md border border-indigo-300 py-2 px-4 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={(e) => props.updateFormType(e)}
                    >
                        Back to Sign In
                    </button>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Confirm Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordSubmit;
