import React from 'react';

type AuthWrapperProps = { children: JSX.Element };

const AuthWrapper = ({ children }: AuthWrapperProps) => {
    return (
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-12 xl:px-18 border shadow-sm bg-gradient-to-b from-blue-50 to-violet-50">
            <div className="mx-auto w-full max-w-sm lg:w-96">{children}</div>
        </div>
    );
};

export default AuthWrapper;
