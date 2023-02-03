import React, { useState } from 'react';

type SignUpProps = {
    signUp: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateFormType: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type signUpFieldValidation = {
    email: boolean;
    emailConfirmed: boolean;
    password: boolean;
};

const SignUp = ({ signUp, updateFormState, ...props }: SignUpProps) => {
    const [formErrors, setFormErrors] = useState<Error[]>();
    const [signUpValid, setSignUpValid] = useState<boolean>(false);

    return (
        <div>
            <input
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
            </button>
        </div>
    );
};

export default SignUp;
