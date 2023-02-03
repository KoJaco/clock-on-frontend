import React, { useState } from 'react';

import { useAuthStore } from '@/stores/AuthStore';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BsApple, BsFacebook, BsGoogle } from 'react-icons/bs';

type SignUpProps = {
    signUp: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateFormType: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SignUp = ({ signUp, updateFormState, ...props }: SignUpProps) => {
    const [sameEmail, setSameEmail] = useState<boolean>(true);

    const [showPassword, setShowPassword] = useState(false);

    const { signUpError, setSignUpError } = useAuthStore();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!sameEmail) {
            setSignUpError(new Error('Please enter the same email address.'));
        } else {
            signUp();
        }
    }

    return (
        <div>
            <div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                    Sign Up
                </h2>

                <div className="mt-8">
                    <div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                With a Social Provider
                            </p>

                            <div className="mt-1 grid grid-cols-3 gap-3">
                                <div>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                    >
                                        <span className="sr-only">
                                            Sign up with Facebook
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
                                        name="username"
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
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Confirm email
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
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
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
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
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

                            {signUpError && (
                                <span className="text-red-500 text-sm">
                                    {signUpError.message}
                                </span>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <button
                                        type="button"
                                        name="signIn"
                                        onClick={(e) => props.updateFormType(e)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Back to Sign In
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign Up
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

            {/*  */}
            {/* <input
                name="username"
                required
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
                placeholder="email"
            />
            <input
                name="email"
                required
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
                placeholder="confirm email"
            />
            <input
                type="password"
                required
                name="password"
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
                placeholder="password"
            />

            <button className="cursor-pointer" onClick={signUp}>
                Sign Up
            </button>
            <button
                name="signIn"
                className="ml-10"
                onClick={(e) => props.updateFormType(e)}
            >
                Back to Sign In
            </button> */}
        </div>
    );
};

export default SignUp;
