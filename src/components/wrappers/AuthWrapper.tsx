import React from 'react';

type AuthWrapperProps = { children: JSX.Element };

const AuthWrapper = ({ children }: AuthWrapperProps) => {
    return <div className="">{children}</div>;
};

export default AuthWrapper;
