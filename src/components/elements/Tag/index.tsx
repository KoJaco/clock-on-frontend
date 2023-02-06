import React, { Fragment } from 'react';
import { useTheme } from 'next-themes';

type TagProps = {
    text: string;
    key?: string | number;
    colorIsBackground?: boolean;
    displayOnly?: boolean;
    color: { name: string; value: string; textDark: boolean };
    callBack?: () => void;
};

const Tag = ({
    colorIsBackground = true,
    displayOnly = true,
    callBack,
    ...props
}: TagProps) => {
    const { theme } = useTheme();

    const textColorStyle = () => {
        if (props.color.name === 'transparent' && theme === 'light') {
            return 'rgba(0,0,0,1)';
        } else if (props.color.name === 'transparent' && theme === 'dark') {
            return 'rgba(255,255,255,1)';
        }
        if (props.color.textDark) {
            return 'black';
        } else {
            return '#fff';
        }
    };

    if (props.text.length > 0) return null;

    return (
        <Fragment key={props.key ? props.key : props.text}>
            {/* coloured in tag */}
            {colorIsBackground ? (
                <button
                    title={`${
                        displayOnly ? props.text : 'Select tag ' + props.text
                    }`}
                    className={`flex items-center rounded-full text-sm md:text-md font-medium px-2 ${
                        props.color.name === 'transparent' &&
                        'border-1 border-slate-500/50'
                    }`}
                    style={{
                        color: textColorStyle(),
                        backgroundColor: props.color.value,
                    }}
                    disabled={displayOnly}
                    onClick={() => callBack && callBack()}
                >
                    {props.text}
                </button>
            ) : (
                // Tag with little coloured dot
                <button
                    className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                    disabled={displayOnly}
                    onClick={() => callBack && callBack()}
                >
                    <span className="absolute flex flex-shrink-0 items-center justify-center">
                        <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: props.color.value }}
                            aria-hidden="true"
                        />
                    </span>
                    <span className="ml-3.5 font-medium text-slate-700">
                        {props.text}
                    </span>
                </button>
            )}
        </Fragment>
    );
};

export default Tag;
