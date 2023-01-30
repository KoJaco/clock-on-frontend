import React from 'react';

type ForgotPasswordProps = {
    forgotPassword: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ForgotPassword = (props: ForgotPasswordProps) => {
    return (
        <div>
            <input
                name="email"
                placeholder="Email"
                onChange={(e) => {
                    e.persist();
                    props.updateFormState(e);
                }}
            />
            <button onClick={props.forgotPassword}>Reset password</button>
        </div>
    );
};

export default ForgotPassword;
