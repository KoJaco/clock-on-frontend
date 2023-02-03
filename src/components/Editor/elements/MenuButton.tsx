import clsx from 'clsx';
import React from 'react';

type MenuButtonProps = {
    title?: string;
    formatName: // text
    | 'bold'
        | 'italic'
        | 'underline'
        | 'strike'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'code'
        | 'font family'
        | 'text color'
        | 'highlight color'
        // control
        | 'undo'
        | 'redo'
        | 'clear formatting'
        // indentation
        | 'text right'
        | 'text left'
        | 'text center'
        | 'text justify'
        // list
        | 'bullet list'
        | 'ordered list'
        // block
        | 'blockquote'
        | 'code block'
        // divisor
        | 'horizontal rule'
        | 'hard break'
        // media
        | 'image'
        | 'file'
        | 'link'
        // components
        | 'table'
        // React component
        | 'excalidraw component'
        | 'image component';
    // tailwind styling
    className?: string;
    // callback funcs
    isDisabled: boolean;
    children: JSX.Element;
    onClick: () => void;
};

const MenuButton = ({ title = '', children, ...props }: MenuButtonProps) => {
    return (
        <button
            title={title}
            className={clsx(
                'rounded-md px-2 py-1 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50',
                props.className && props.className
            )}
            onClick={props.onClick}
            disabled={props.isDisabled}
        >
            {children}
        </button>
    );
};

export default MenuButton;
