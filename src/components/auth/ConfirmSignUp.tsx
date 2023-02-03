import { Auth } from 'aws-amplify';
import React, { useCallback } from 'react';

type ConfirmSignUp = {
    emailAsUsername: string;
    confirmSignUp: () => void;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

            <button onClick={resendConfirmationCode}></button>
            <div>{props.emailAsUsername}</div>
        </div>
    );
};

export default ConfirmSingUp;
