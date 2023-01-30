import React from 'react';

type SignUpProps = {
    signUp: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignUp = ({ signUp, updateFormState }: SignUpProps) => {
    return (
        <div>
            <input
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
            />
            <input
                name="email"
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
                placeholder="email"
            />
            <button className="cursor-pointer" onClick={signUp}>
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;
