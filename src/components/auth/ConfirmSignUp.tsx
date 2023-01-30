import React from 'react';

type ConfirmSignUp = {
    confirmSignUp: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ConfirmSingUp = (props: ConfirmSignUp) => {
    return (
        <div className="w-1/2 h-auto">
            <input
                name="confirmationCode"
                placeholder="Confirmation Code"
                onChange={(e) => {
                    e.persist();
                    props.updateFormState(e);
                }}
            />
            <button onClick={props.confirmSignUp}>Confirm Sing Up</button>
        </div>
    );
};

export default ConfirmSingUp;
