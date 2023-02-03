import React, { Dispatch, useState } from 'react';
import { Auth } from 'aws-amplify';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordSubmit from './ForgotPasswordSubmit';
import { AmplifyUser } from '@aws-amplify/ui';

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

type UniqueIdentifier = string | number;

export interface FormErrorRecords {
    [key: UniqueIdentifier]: { errors: Error[] | null };
}

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
    { email, password }: FormState,
    setUser: (value: any) => void
) {
    if (email && password) {
        try {
            const user = await Auth.signIn(email, password);
            const userInfo = { email: user.email, ...user.attributes };
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
    const [formErrors, setFormErrors] =
        useState<typeof initialFormErrors>(initialFormErrors);

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
                    />
                );
            case 'signIn':
                return (
                    <SignIn
                        errors={formErrors}
                        signIn={() => signIn(formState, props.setUser)}
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
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div>
            {renderForm()}
            {/* {formType === 'signUp' && (
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
            )} */}
        </div>
    );
};

export default Form;
