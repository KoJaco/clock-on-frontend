import React from 'react';

type ForgotPasswordProps = {
    forgotPassword: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateFormType: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ForgotPassword = (props: ForgotPasswordProps) => {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.forgotPassword();
    }

    return (
        <div className="mt-6">
            <h2 className="mt-6 text-xl font-bold tracking-tight text-slate-700">
                Password Reset
            </h2>

            <p className="mt-2 mb-6 text-sm">
                A verification code will be sent to your email address shortly.
            </p>
            <div className="mb-6 flex">
                <span className="w-full border-b border-slate-300 -translate-y-2"></span>
            </div>
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
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
                        Reset password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
