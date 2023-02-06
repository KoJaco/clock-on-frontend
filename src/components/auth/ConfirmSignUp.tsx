import { Auth } from 'aws-amplify';
import React, { useCallback } from 'react';

type ConfirmSignUp = {
    emailAsUsername: string;
    confirmSignUp: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateFormType: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ConfirmSingUp = (props: ConfirmSignUp) => {
    const resendConfirmationCode = useCallback(() => {
        async () => {
            try {
                await Auth.resendSignUp(props.emailAsUsername);
                console.info('Code sent successfully');
            } catch (err) {
                console.warn('Error resending code: ', err);
            }
        };
    }, [props.emailAsUsername]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.confirmSignUp();
    }

    return (
        <div className="">
            <h2 className="mt-6 text-xl font-bold tracking-tight text-slate-700">
                {"We're excited to have you with us!"}
            </h2>
            <p className="mt-2 mb-6 text-sm">
                Please enter the confirmation code we sent to&ensp;
                {props.emailAsUsername}
            </p>

            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label
                        htmlFor="confirmationCode"
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

                <div className="flex gap-x-10">
                    <button
                        name="signIn"
                        type="button"
                        className="flex w-full justify-center rounded-md border border-indigo-300 py-2 px-4 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        // onClick={(e) => props.updateFormType(e)}
                    >
                        Back to Sign In
                    </button>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={(e) => props.updateFormType(e)}
                    >
                        Confirm Sign Up
                    </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                    {`Haven't received anything? `}
                    <button
                        type="button"
                        onClick={() => resendConfirmationCode()}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        resend confirmation code
                    </button>
                </p>
            </form>
        </div>
    );
};

export default ConfirmSingUp;
