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
            const userInfo = { username: data.username, ...data.attributes };
            setUser(userInfo);
        } catch (err) {
            console.log('error: ', err);
        }
    }

    function signOut() {
        Auth.signOut().catch((err) => console.log('Error signing out: ', err));
    }

    // catch null user case
    if (!user || !user.username) return <Form setUser={setUser} />;

    return (
        <AuthWrapper>
            <>
                <h1>Profile</h1>
                <h2>
                    {'Username (id):'} {user?.username}
                </h2>
                <h2>Email: {user?.email}</h2>
                <button onClick={signOut}>Sign Out</button>
            </>
        </AuthWrapper>
    );
};

export default UserProfile;
