import clsx from 'clsx';
import React, { Fragment } from 'react';

type props = {
    // First line will default be used as the title.
    title: string;
    timestamp: Date;
    tags: {
        text: string;
        color: { name: string; value: string; textDark: boolean };
    }[];
    folder: {
        title: string;
        badgeColor: { name: string; value: string; textDark: boolean };
    };
};

const NoteDisplayCard = ({ tags, folder, ...props }: props) => {
    return (
        <div className="flex h-auto w-full flex-col rounded-sm px-4 py-2 shadow transition-all duration-300 hover:border hover:border-slate-100 hover:shadow-lg">
            {/* upper wrapper */}
            <h5 className="font-regular mr-4 w-2/3 truncate">{props.title}</h5>
            <p className="mb-4 text-sm font-light">
                {props.timestamp.toLocaleDateString()}
            </p>
            <div className="flex w-full">
                {tags.map((tag, index) => (
                    <Fragment key={index}>
                        <button className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                            <span className="absolute flex flex-shrink-0 items-center justify-center">
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{
                                        backgroundColor: tag.color.value,
                                    }}
                                    aria-hidden="true"
                                />
                            </span>
                            <span className="font-regular ml-3.5 text-gray-900">
                                {tag.text}
                            </span>
                        </button>
                    </Fragment>
                    // <span
                    //     key={index}
                    //     style={{
                    //         backgroundColor: tag.color.value,
                    //         color: tag.color.textDark ? 'black' : 'white',
                    //     }}
                    //     className="flex w-auto items-center rounded-full px-2 py-0.5 text-xs"
                    // >
                    //     {tag.text}
                    // </span>
                ))}
            </div>
        </div>
    );
};

export default NoteDisplayCard;
