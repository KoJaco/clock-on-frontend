import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import AuthWrapper from '../wrappers/AuthWrapper';
import Form from './Form';

// MUST DEFINE USER TYPE

const UserProfile = () => {
    // state
    const [user, setUser] = useState<null | any>(null);

    // other hooks
    useEffect(() => {
        checkUser();
        Hub.listen('auth', (data) => {
            const { payload } = data;
            if (payload.event === 'signOut') {
                setUser(null);
            }
        });
    }, []);

    // funcs

    async function checkUser() {
        // validation for user fields.
        try {
            const data = await Auth.currentUserPoolUser();
            const userInfo = { email: data.email, ...data.attributes };
            setUser(userInfo);
        } catch (err) {
            console.log('error: ', err);
        }
    }

    function signOut() {
        Auth.signOut().catch((err) => console.log('Error signing out: ', err));
    }

    // catch null user case
    if (!user || !user.email)
        return (
            <AuthWrapper>
                <Form setUser={setUser} />
            </AuthWrapper>
        );

    console.log(user);

    return (
        <AuthWrapper>
            <div className="space-y-2">
                <h1>Profile</h1>
                <h2>Sub: {user?.sub}</h2>
                <h2>Email: {user?.email}</h2>
                <h2>Email verified: {user?.email_verified ? 'Yes' : 'No'}</h2>

                <button onClick={signOut}>Sign Out</button>
            </div>
        </AuthWrapper>
    );
};

export default UserProfile;
