import React from 'react';
import clsx from 'clsx';

interface CellProps extends React.PropsWithChildren {
    key?: string | number;
    className?: string;
}

const Cell = ({ children, ...props }: CellProps) => {
    return (
        <div
            key={props.key ? props.key : ''}
            className={clsx('', props.className)}
        >
            {children}
        </div>
    );
};

export default Cell;
