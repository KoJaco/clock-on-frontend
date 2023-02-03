import React, { useState, Fragment, useEffect } from 'react';
import clsx from 'clsx';

import { Dialog, Transition, Menu } from '@headlessui/react';
import {
    BsSliders,
    BsQuestionCircle,
    BsArrowsCollapse,
    BsArrowsExpand,
    BsCalendarRange,
    BsCollection,
    BsTag,
    BsImage,
} from 'react-icons/bs';
import {
    IoCreateOutline,
    IoSettingsOutline,
    IoListOutline,
    IoCalendarOutline,
    IoClose,
} from 'react-icons/io5';

import {
    CgMenuLeftAlt,
    CgMenuLeft,
    CgMenuMotion,
    CgMenuGridO,
    CgMenu,
    CgNotes,
    CgArrowsShrinkH,
    CgChevronDown,
    CgTimer,
    CgCalendarDates,
    CgCalendar,
} from 'react-icons/cg';

import {
    MdHome,
    MdOutlineNotes,
    MdOutlineFolderOpen,
    MdOutlineCreateNewFolder,
    MdOutlineFullscreenExit,
    MdOutlineTimeline,
    MdOutlineScreenShare,
    MdOutlineLock,
    MdOutlineLockOpen,
    MdOutlineTimer,
    MdDateRange,
} from 'react-icons/md';

// global store
import { useUIControlStore } from '@/stores/UIControlStore';

import BaseDropdown from '../elements/dropdowns/BaseDropdown';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Calendar from '../Calendar';
import Timeline from '../Timeline';
import Editor from '../Editor';

import { Auth, Hub } from 'aws-amplify';
import AuthWrapper from '../wrappers/AuthWrapper';
import Form from '../auth/Form';
import { useApplicationStore } from '@/stores/ApplicationStore';

type SlideoverProps = {
    placement?: 'left' | 'right';
    direction?: 'l-to-r' | 'r-to-l';
};

const sidebarTabs = [
    { name: 'Notes', icon: CgNotes },
    { name: 'Folders', icon: MdOutlineFolderOpen },
    { name: 'Tags', icon: BsTag },
    { name: 'Shared', icon: MdOutlineScreenShare },
    { name: 'Media', icon: BsImage },
    { name: 'Settings', icon: IoSettingsOutline },
];

const mockBreadcrumbs = ['work', 'clients', 'c-linx'];

const Slideover = ({
    placement = 'left',
    direction = 'l-to-r',
}: SlideoverProps) => {
    // local state
    // state
    const [user, setUser] = useState<null | any>(null);

    const [currentTab, setCurrentTab] = useState<string>('Notes');
    const [expandNarrowSidebar, setExpandNarrowSidebar] =
        useState<boolean>(true);

    const [showTimelineCalendar, setShowTimelineCalendar] = useState(true);

    // global state
    const { showSlideover, setShowSlideover } = useUIControlStore();
    const { actingOnDateRange, setActingOnDateRange } = useApplicationStore();

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
            const userInfo = { email: data.email, ...data.attributes };
            setUser(userInfo);
        } catch (err) {
            console.log('error: ', err);
        }
    }

    function signOut() {
        Auth.signOut().catch((err) => console.log('Error signing out: ', err));
    }

    if (!user || !user.email)
        return (
            <AuthWrapper>
                <Form setUser={setUser} />
            </AuthWrapper>
        );

    return (
        <>
            <Transition.Root show={showSlideover} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 flex h-screen overflow-y-auto"
                    onClose={setShowSlideover}
                >
                    {/* Fixed background cover, have user's define if they want this */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-500 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-500 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            {/* Slideover main */}
                            <Dialog.Panel className="relative flex w-full max-w-lg flex-1 flex-col">
                                {/* Close slideover button */}
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-500"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-500"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    {/* button needs to be same level as upper nav section */}
                                    <div className="absolute top-0 right-0 -mr-12 pt-4">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setShowSlideover(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <IoClose
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>

                                <div
                                    className={clsx(
                                        'border-1 flex h-full flex-1 flex-row border-r border-transparent  shadow-md',
                                        actingOnDateRange
                                            ? 'bg-gray-600 bg-opacity-75'
                                            : 'bg-gradient-to-b from-[#fefefe] to-[#fefefe]'
                                    )}
                                >
                                    {/* Narrow sidebar - Tabs */}
                                    <div
                                        className={clsx(
                                            'border-1 h-screen border-r border-transparent bg-gradient-to-b from-indigo-800 to-indigo-700',
                                            expandNarrowSidebar
                                                ? 'w-24'
                                                : 'w-16'
                                        )}
                                    >
                                        <div className="flex h-full w-full flex-col items-center pt-6 pb-2">
                                            {/* logo / brand */}
                                            <div className="mb-6 flex flex-shrink-0 items-center">
                                                <div className="border-b border-indigo-400  text-indigo-50">
                                                    Logo
                                                </div>
                                            </div>
                                            <div className="mt-6 w-full flex-1 space-y-4 px-2">
                                                {sidebarTabs.map((item) => (
                                                    <button
                                                        key={item.name}
                                                        className={clsx(
                                                            item.name ===
                                                                currentTab
                                                                ? 'bg-indigo-200 text-indigo-900'
                                                                : 'text-indigo-50 hover:bg-indigo-400 hover:text-blue-900',
                                                            'transition-color group flex w-full flex-col items-center rounded-md text-xs font-medium duration-300',
                                                            expandNarrowSidebar
                                                                ? 'p-3'
                                                                : 'p-2'
                                                        )}
                                                        onClick={() =>
                                                            setCurrentTab(
                                                                item.name
                                                            )
                                                        }
                                                    >
                                                        <item.icon
                                                            className={clsx(
                                                                item.name ===
                                                                    currentTab
                                                                    ? 'text-blue-900'
                                                                    : 'text-indigo-100 group-hover:text-blue-900',
                                                                'transition-color mb-2 h-6 w-6 duration-300',
                                                                expandNarrowSidebar
                                                                    ? 'mb-2'
                                                                    : 'mb-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {expandNarrowSidebar && (
                                                            <span className="">
                                                                {item.name}
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* footer - profile */}

                                            <button
                                                className={clsx(
                                                    'transition-color group mt-auto flex flex-col items-center rounded-lg duration-300 hover:bg-indigo-400',
                                                    expandNarrowSidebar
                                                        ? 'px-4 py-2'
                                                        : 'mb-2 px-2 py-2'
                                                )}
                                                onClick={signOut}
                                            >
                                                <div
                                                    className={clsx(
                                                        expandNarrowSidebar
                                                            ? 'pb-2'
                                                            : 'pb-1'
                                                    )}
                                                >
                                                    <span className="transition-color inline-flex h-6 w-6 items-center justify-center rounded-full bg-white duration-300 group-hover:bg-blue-900">
                                                        <span className="transition-color text-xs font-medium leading-none text-blue-900 duration-300 group-hover:text-white">
                                                            KJ
                                                        </span>
                                                    </span>
                                                </div>
                                                {expandNarrowSidebar && (
                                                    <div className="text-center">
                                                        <p className="transition-color text-xs font-medium text-indigo-100 duration-300 group-hover:text-blue-900">
                                                            Profile
                                                        </p>
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {/* End Narrow Sidebar - Tabs*/}

                                    {/* Wide sidebar - Application*/}
                                    <div className="flex h-full w-full flex-col py-6">
                                        {/* upper section matches logo */}
                                        <div className="mb-6 flex w-full flex-shrink-0 ">
                                            {/* left accessors */}
                                            <div className="flex w-full items-center justify-between gap-x-2 px-1 text-slate-700">
                                                <div className="flex">
                                                    <button
                                                        title="Narrow Sidebar"
                                                        className="rounded-full py-1 px-1 hover:scale-105"
                                                        onClick={() =>
                                                            setExpandNarrowSidebar(
                                                                !expandNarrowSidebar
                                                            )
                                                        }
                                                    >
                                                        {expandNarrowSidebar ? (
                                                            <CgMenuLeft className="h-5 w-5" />
                                                        ) : (
                                                            <CgMenuMotion className="h-5 w-5" />
                                                        )}
                                                    </button>
                                                    <button
                                                        title="Narrow Sidebar"
                                                        className="rounded-full py-1 px-1 hover:scale-105"
                                                    >
                                                        <MdOutlineLock className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                {/* Start Menu Dropdown */}
                                                <div className="ml-auto flex">
                                                    <BaseDropdown labelTitle="Menu">
                                                        <>
                                                            <div className="py-1">
                                                                <Menu.Item>
                                                                    {() => (
                                                                        <button className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
                                                                            <IoCreateOutline
                                                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                            New
                                                                            Note
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {() => (
                                                                        <button className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
                                                                            <MdOutlineTimer
                                                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                            Clock
                                                                            On
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                            <div className="py-1">
                                                                <Menu.Item>
                                                                    {() => (
                                                                        <button
                                                                            className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-slate-200"
                                                                            onClick={() =>
                                                                                setShowTimelineCalendar(
                                                                                    !showTimelineCalendar
                                                                                )
                                                                            }
                                                                        >
                                                                            <CgCalendarDates
                                                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                            {showTimelineCalendar
                                                                                ? 'Hide Calendar'
                                                                                : 'Show Calendar'}
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {() => (
                                                                        <button
                                                                            className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-slate-200"
                                                                            onClick={() =>
                                                                                setActingOnDateRange(
                                                                                    !actingOnDateRange
                                                                                )
                                                                            }
                                                                        >
                                                                            <CgCalendar
                                                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                            Select
                                                                            Date
                                                                            Range
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                            <div className="py-1">
                                                                <Menu.Item>
                                                                    {() => (
                                                                        <button className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
                                                                            <BsCollection
                                                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                            Collapse
                                                                            Timeline
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                        </>
                                                    </BaseDropdown>
                                                </div>
                                                {/* End Menu Dropdown */}
                                            </div>

                                            {/* right accessors */}
                                            <div className="ml-auto flex px-2"></div>
                                        </div>

                                        <div className="mt-5 flex h-auto min-h-full w-full flex-col px-2">
                                            {/* Upper content wrappers, icons, buttons, navigation, etc. */}
                                            {currentTab === 'Folders' && (
                                                // Breadcrumbs for folders, make separate component
                                                <nav
                                                    className="flex"
                                                    aria-label="Breadcrumbs"
                                                >
                                                    <ol
                                                        role="list"
                                                        className="flex flex-wrap items-center gap-y-2 space-x-2"
                                                    >
                                                        <li>
                                                            <div>
                                                                <a
                                                                    href="#"
                                                                    className="text-slate-400 hover:text-slate-700"
                                                                >
                                                                    <MdHome
                                                                        href="#"
                                                                        className="h-5 w-5"
                                                                    />
                                                                    <span className="sr-only">
                                                                        Home
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </li>
                                                        {mockBreadcrumbs.map(
                                                            (
                                                                breadCrumb,
                                                                index
                                                            ) => (
                                                                <li key={index}>
                                                                    <div className="flex items-center">
                                                                        <svg
                                                                            className="h-5 w-5 flex-shrink-0 text-gray-300"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                                                        </svg>
                                                                        <a
                                                                            href="#"
                                                                            className="ml-1 text-sm font-medium text-slate-500 hover:text-slate-700"
                                                                        >
                                                                            {
                                                                                breadCrumb
                                                                            }
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                            )
                                                        )}
                                                    </ol>
                                                </nav>
                                            )}
                                            {currentTab === 'Notes' && (
                                                <>
                                                    <div className="mb-6 h-full">
                                                        <Timeline
                                                            showCalendar={
                                                                showTimelineCalendar
                                                            }
                                                        />
                                                    </div>
                                                    {/* footer/spacer */}
                                                    <div className="py-4"></div>
                                                </>
                                            )}
                                            {currentTab === 'Settings' && <></>}
                                        </div>
                                    </div>
                                    {/* End wide sidebar - Application */}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default Slideover;
