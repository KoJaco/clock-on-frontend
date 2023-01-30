import React from 'react';

type SignInProps = {
    signIn: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignIn = ({ signIn, updateFormState }: SignInProps) => {
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
            <button onClick={signIn}>Sign In</button>
        </div>
    );
};

export default SignIn;
