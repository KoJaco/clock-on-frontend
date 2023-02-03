import React, { Dispatch, useCallback, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordSubmit from './ForgotPasswordSubmit';
import { AmplifyUser } from '@aws-amplify/ui';
import { FormErrorRecords } from '@/core/types/auth';

import { useAuthStore } from '@/stores/AuthStore';

// username is email in this case
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

const initialFormErrors: FormErrorRecords = {
    signIn: { errors: null },
    signUp: { errors: null },
    confirmSignUp: { errors: null },
    forgotPassword: { errors: null },
    forgotPasswordSubmit: { errors: null },
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
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: { email },
                autoSignIn: {
                    enabled: true,
                },
            });
            console.log('sign up success');
            console.log(user);
            updateFormType('confirmSignUp');
        } catch (err: any) {
            let message: string;
            switch (err) {
                case 'InvalidParameterException':
                    message = 'Username should be an email';
                    break;
                case 'UsernameExistsException':
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Something went wrong';
            }

            console.log('error signing up: ', message);
        }
    }
}

// confirms sign up and updates form type to sign in, i.e. redirects user to sign in form.
async function confirmSignUp(
    { username, confirmationCode }: FormState,
    updateFormType: (value: FormType) => void
) {
    if (username && confirmationCode) {
        try {
            await Auth.confirmSignUp(username, confirmationCode);
            updateFormType('signIn');
        } catch (err) {
            console.warn('error confirming sign up: ', err);
        }
    }
}
// Signs the user in and sets the current user.

async function signIn(
    { email, password }: FormState,
    setUser: (value: any) => void,
    setSignInError: (value: Error) => void
) {
    if (email && password) {
        try {
            const user = await Auth.signIn(email, password);
            const userInfo = { email: user.email, ...user.attributes };
            setUser(userInfo);
        } catch (err: any) {
            console.warn('error signing in: ', err);
            setSignInError(err);
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
            console.warn('error submitting forgot password: ', err);
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
            console.warn('error submitting forgot password submit: ', err);
        }
    }
}

const Form = (props: FormProps) => {
    const [formType, setFormType] = useState('signIn');
    const [formState, setFormState] = useState(initialFormState);

    const { setSignInError, resetErrors } = useAuthStore();

    function updateForm(event: React.ChangeEvent<HTMLInputElement>) {
        setFormState({
            ...formState,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    }

    useEffect(() => {
        // when formType changes, i.e. our form changes, reset all errors in global state
        resetErrors();
    }, [formType, resetErrors]);

    function renderForm() {
        switch (formType) {
            case 'signUp':
                return (
                    <SignUp
                        signUp={() => signUp(formState, setFormType)}
                        updateFormState={(e) => updateForm(e)}
                        updateFormType={(e) =>
                            setFormType(e.currentTarget.name)
                        }
                    />
                );
            case 'confirmSignUp':
                return (
                    <ConfirmSignUp
                        emailAsUsername={formState.username}
                        confirmSignUp={() =>
                            confirmSignUp(formState, setFormType)
                        }
                        updateFormState={(e) => updateForm(e)}
                        updateFormType={(e) =>
                            setFormType(e.currentTarget.name)
                        }
                    />
                );
            case 'signIn':
                return (
                    <SignIn
                        signIn={() =>
                            signIn(formState, props.setUser, setSignInError)
                        }
                        updateFormState={(e) => updateForm(e)}
                        updateFormType={(e) =>
                            setFormType(e.currentTarget.name)
                        }
                    />
                );
            case 'forgotPassword':
                return (
                    <ForgotPassword
                        forgotPassword={() =>
                            forgotPassword(formState, setFormType)
                        }
                        updateFormState={(e) => updateForm(e)}
                        updateFormType={(e) =>
                            setFormType(e.currentTarget.name)
                        }
                    />
                );
            case 'forgotPasswordSubmit':
                return (
                    <ForgotPasswordSubmit
                        forgotPasswordSubmit={() =>
                            forgotPasswordSubmit(formState, setFormType)
                        }
                        updateFormState={(e) => updateForm(e)}
                        updateFormType={(e) =>
                            setFormType(e.currentTarget.name)
                        }
                    />
                );
            default:
                return null;
        }
    }

    return <div>{renderForm()}</div>;
};

export default Form;
