import React, { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import { CgChevronDown } from 'react-icons/cg';
import clsx from 'clsx';
import { IoCalendarOutline } from 'react-icons/io5';
type BaseDropDownProps = {
    minimalLabel?: boolean;
    labelTitle?: string;
    children?: JSX.Element;
    menuItemsStyling?: string;
    menuButtonStyling?: string;
};

const BaseDropdown = ({
    labelTitle = 'Options',
    minimalLabel = false,
    children,
    ...props
}: BaseDropDownProps) => {
    return (
        <Menu as="div" className="relative z-40">
            {minimalLabel ? (
                <div title={labelTitle}>
                    <Menu.Button
                        className={
                            props.menuButtonStyling
                                ? props.menuButtonStyling
                                : 'inline-flex w-full justify-center rounded-full text-sm font-medium text-slate-700 focus:outline-none'
                        }
                    >
                        <BiDotsVerticalRounded
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
            ) : (
                <div>
                    <Menu.Button
                        className={
                            props.menuButtonStyling
                                ? props.menuButtonStyling
                                : 'inline-flex w-full justify-center rounded-full px-2 text-sm font-medium text-slate-700  focus:outline-none'
                        }
                    >
                        {labelTitle}
                        <CgChevronDown
                            className="-mr-1 ml-2 h-5 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
            )}

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={
                        props.menuButtonStyling
                            ? props.menuButtonStyling
                            : 'absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    }
                >
                    {/* Children must conform to Menu.item format */}
                    {children ? (
                        <>{children}</>
                    ) : (
                        <>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={clsx(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'group flex items-center px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoCalendarOutline
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Edit
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={clsx(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'group flex items-center px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoCalendarOutline
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Duplicate
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={clsx(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'group flex items-center px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoCalendarOutline
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Archive
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={clsx(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'group flex items-center px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoCalendarOutline
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Move
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={clsx(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'group flex items-center px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoCalendarOutline
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Share
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={clsx(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'group flex items-center px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoCalendarOutline
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Add to favorites
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={clsx(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'group flex items-center px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoCalendarOutline
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Delete
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default BaseDropdown;
