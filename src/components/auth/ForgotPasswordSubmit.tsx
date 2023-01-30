import React from 'react';

type ForgotPasswordSubmitProps = {
    forgotPasswordSubmit: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ForgotPasswordSubmit = (props: ForgotPasswordSubmitProps) => {
    return (
        <div>
            <input
                name="confirmationCode"
                placeholder="Confirmation Code"
                onChange={(e) => {
                    e.persist();
                    props.updateFormState(e);
                }}
            />
            <input
                name="password"
                placeholder="New Password"
                type="password"
                onChange={(e) => {
                    e.persist();
                    props.updateFormState(e);
                }}
            />
            <button onClick={props.forgotPasswordSubmit}>Reset password</button>
        </div>
    );
};

export default ForgotPasswordSubmit;
