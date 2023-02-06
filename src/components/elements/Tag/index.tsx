import React from 'react';
import { useTheme } from 'next-themes';

type TagProps = {
    text: string;
    colorIsBackground?: boolean;
    color: { name: string; value: string; textDark: boolean };
};

const Tag = ({ colorIsBackground = true, ...props }: TagProps) => {
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

    return (
        <>
            {props.text.length > 0 && (
                <div
                    className={`flex items-center rounded-full ${
                        props.color.name === 'transparent' &&
                        'border-1 border-slate-500/50'
                    }`}
                    style={{
                        backgroundColor: props.color.value,
                    }}
                >
                    <span
                        className="text-sm md:text-md font-medium px-2"
                        style={{
                            color: textColorStyle(),
                        }}
                    >
                        {props.text}
                    </span>
                </div>
            )}
        </>
    );
};

export default Tag;
