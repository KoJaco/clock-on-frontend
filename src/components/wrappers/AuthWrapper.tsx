import React from 'react';

type AuthWrapperProps = { children: JSX.Element };

const AuthWrapper = ({ children }: AuthWrapperProps) => {
    return (
        <div className="flex flex-col items-center justify-center border shadow-sm bg-gradient-to-b from-blue-50 to-violet-50 max-w-lg h-screen">
            <div className="h-auto lg:w-96 md:w-[22rem] min-w-80">
                {children}
            </div>
        </div>
    );
};

export default AuthWrapper;
