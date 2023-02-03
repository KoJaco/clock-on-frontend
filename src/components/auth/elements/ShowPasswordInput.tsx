import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

type ShowPasswordInputProps = {
    inputStyling?: string;
    customOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ShowPasswordInput = ({
    customOnChange,
    ...props
}: ShowPasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
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
                        customOnChange(e);
                    }}
                    required
                    className={
                        props.inputStyling
                            ? props.inputStyling
                            : 'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    }
                />
            </div>
        </>
    );
};

export default ShowPasswordInput;
