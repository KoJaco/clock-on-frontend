import React, { Dispatch, useState } from 'react';
import { Auth } from 'aws-amplify';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordSubmit from './ForgotPasswordSubmit';

type FormState = {
    username?: string;
    password?: string;
    email?: string;
    confirmationCode?: string;
};

type FormType =
    | 'signUp'
    | 'confirmSignUp'
    | 'signIn'
    | 'forgotPassword'
    | 'forgotPasswordSubmit';

type FormProps = {
    // state setter
    setUser: Dispatch<any>;
};

const initialFormState = {
    username: '',
    password: '',
    email: '',
    confirmationCode: '',
};

async function signUp(
    { username, password, email }: FormState,
    updateFormType: (value: FormType) => void
) {
    if (username && password && email) {
        try {
            await Auth.signUp({
                username,
                password,
                attributes: { email },
            });

            console.log('sign up success');
            updateFormType('confirmSignUp');
        } catch (err) {
            console.log('error signing up: ', err);
        }
    }
}

async function confirmSignUp(
    { username, confirmationCode }: FormState,
    updateFormType: (value: FormType) => void
) {
    if (username && confirmationCode) {
        try {
            await Auth.confirmSignUp(username, confirmationCode);
            updateFormType('signIn');
        } catch (err) {
            console.log('error confirming sign up: ', err);
        }
    }
}

async function signIn(
    { username, password }: FormState,
    setUser: (value: any) => void
) {
    if (username && password) {
        try {
            const user = await Auth.signIn(username, password);
            const userInfo = { username: user.username, ...user.attributes };
            setUser(userInfo);
        } catch (err) {
            console.log('error signing in: ', err);
        }
    }
}

async function forgotPassword(
    { email }: FormState,
    updateFormType: (value: FormType) => void
) {
    if (email) {
        try {
            await Auth.forgotPassword(email);
            updateFormType('forgotPasswordSubmit');
        } catch (err) {
            console.log('error submitting forgot password: ', err);
        }
    }
}

async function forgotPasswordSubmit(
    { email, confirmationCode, password }: FormState,
    updateFormType: (value: FormType) => void
) {
    if (email && confirmationCode && password) {
        try {
            await Auth.forgotPasswordSubmit(email, confirmationCode, password);

            updateFormType('signIn');
        } catch (err) {
            console.log('error submitting forgot password submit: ', err);
        }
    }
}

const Form = (props: FormProps) => {
    const [formType, setFormType] = useState('signIn');
    const [formState, setFormState] = useState(initialFormState);

    function updateForm(event: React.ChangeEvent<HTMLInputElement>) {
        setFormState({
            ...formState,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    }

    function renderForm() {
        switch (formType) {
            case 'signUp':
                return (
                    <SignUp
                        signUp={() => signUp(formState, setFormType)}
                        updateFormState={(e) => updateForm(e)}
                    />
                );
            case 'confirmSignUp':
                return (
                    <ConfirmSignUp
                        confirmSignUp={() =>
                            confirmSignUp(formState, setFormType)
                        }
                        updateFormState={(e) => updateForm(e)}
                    />
                );
            case 'signIn':
                return (
                    <SignIn
                        signIn={() => signIn(formState, props.setUser)}
                        updateFormState={(e) => updateForm(e)}
                    />
                );
            case 'forgotPassword':
                return (
                    <ForgotPassword
                        forgotPassword={() =>
                            forgotPassword(formState, setFormType)
                        }
                        updateFormState={(e) => updateForm(e)}
                    />
                );
            case 'forgotPasswordSubmit':
                return (
                    <ForgotPasswordSubmit
                        forgotPasswordSubmit={() =>
                            forgotPasswordSubmit(formState, setFormType)
                        }
                        updateFormState={(e) => updateForm(e)}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div>
            {renderForm()}
            {formType === 'signUp' && (
                <p>
                    Already have an account?{' '}
                    <span onClick={() => setFormType('signIn')}>Sign In</span>
                </p>
            )}
            {formType === 'signIn' && (
                <>
                    <p>
                        Need an account?{' '}
                        <button onClick={() => setFormType('signUp')}>
                            Sign Up
                        </button>
                    </p>
                    <p>
                        Forget your password?{' '}
                        <button onClick={() => setFormType('forgotPassword')}>
                            Reset Password
                        </button>
                    </p>
                </>
            )}
        </div>
    );
};

export default Form;
