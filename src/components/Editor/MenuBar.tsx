import type { Editor } from '@tiptap/react';
import React from 'react';
import { AiOutlineFontColors, AiOutlineHighlight } from 'react-icons/ai';
import {
    BsTypeBold,
    BsTypeItalic,
    BsTypeUnderline,
    BsTypeStrikethrough,
    BsCode,
} from 'react-icons/bs';
import {
    RxFontFamily,
    RxTextAlignCenter,
    RxTextAlignJustify,
    RxTextAlignLeft,
    RxTextAlignRight,
} from 'react-icons/rx';
import { CgFormatHeading, CgQuote, CgUndo, CgRedo } from 'react-icons/cg';

import {
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdOutlineHorizontalRule,
    MdOutlineFormatClear,
} from 'react-icons/md';

import BaseDropdown from '../elements/dropdowns/BaseDropdown';
import MenuButton from './elements/MenuButton';
import clsx from 'clsx';
import { Menu } from '@headlessui/react';

type MenuBarProps = {
    editor: Editor | null;
};

const MenuBar = ({ editor }: MenuBarProps) => {
    if (editor === null) {
        return null;
    }

    return (
        // Menu wrapper
        <div className="mb-4 flex w-full flex-row flex-wrap gap-x-10 divide-x">
            {/* Undo/redo */}
            <div className="flex w-auto items-center justify-center gap-x-1">
                <MenuButton
                    title="Undo"
                    isDisabled={!editor.can().chain().focus().undo().run()}
                    onClick={() => editor.chain().focus().undo().run()}
                    formatName="undo"
                    className="text-slate-700"
                >
                    <CgUndo className="h-5 w-5" />
                </MenuButton>
                <MenuButton
                    title="Redo"
                    isDisabled={!editor.can().chain().focus().redo().run()}
                    onClick={() => editor.chain().focus().redo().run()}
                    formatName="redo"
                    className="text-slate-700"
                >
                    <CgRedo className="h-5 w-5" />
                </MenuButton>
            </div>
            {/*  Text formatting */}
            <div className="flex items-center justify-center gap-x-1">
                <MenuButton
                    title="Format Bold"
                    isDisabled={
                        !editor.can().chain().focus().toggleBold().run()
                    }
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    formatName="bold"
                    className={clsx(
                        editor.isActive('bold')
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700'
                    )}
                >
                    <BsTypeBold className="h-5 w-5" />
                </MenuButton>
                <MenuButton
                    title="Format Italic"
                    isDisabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    formatName="italic"
                    className={clsx(
                        editor.isActive('italic')
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700'
                    )}
                >
                    <BsTypeItalic className="h-5 w-5" />
                </MenuButton>
                <MenuButton
                    title="Format Strikethrough"
                    isDisabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    formatName="strike"
                    className={clsx(
                        editor.isActive('strike')
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700'
                    )}
                >
                    <BsTypeStrikethrough className="h-5 w-5" />
                </MenuButton>
            </div>

            {/* Font family and colouring */}
            <div className="flex items-center justify-center gap-x-1">
                <BaseDropdown labelTitle="Font Family">
                    <>
                        <div className="py-1">
                            <Menu.Item>
                                {() => (
                                    <MenuButton
                                        title="Remove Font Family"
                                        isDisabled={false}
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .unsetFontFamily()
                                                .run()
                                        }
                                        formatName="font family"
                                        className="w-full rounded-none px-4 text-left text-slate-700"
                                    >
                                        <p className="text-slate-700">
                                            Clear Font
                                        </p>
                                    </MenuButton>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {() => (
                                    <MenuButton
                                        title="Set Inter Font Family"
                                        isDisabled={false}
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setFontFamily('Inter')
                                                .run()
                                        }
                                        formatName="font family"
                                        className={clsx(
                                            'w-full rounded-none px-4 text-left text-slate-700',
                                            editor.isActive({
                                                fontFamily: 'Inter',
                                            })
                                                ? ''
                                                : ''
                                        )}
                                    >
                                        <p
                                            className="text-slate-700"
                                            style={{ fontFamily: 'Inter' }}
                                        >
                                            Inter
                                        </p>
                                    </MenuButton>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {() => (
                                    <MenuButton
                                        title="Set Serif Font Family"
                                        isDisabled={false}
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setFontFamily('serif')
                                                .run()
                                        }
                                        formatName="font family"
                                        className={clsx(
                                            'w-full rounded-none px-4 text-left',
                                            editor.isActive({
                                                fontFamily: 'serif',
                                            })
                                                ? ''
                                                : ''
                                        )}
                                    >
                                        <p
                                            className="text-slate-700"
                                            style={{ fontFamily: 'serif' }}
                                        >
                                            Serif
                                        </p>
                                    </MenuButton>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {() => (
                                    <MenuButton
                                        title="Set Monospace Font Family"
                                        isDisabled={false}
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setFontFamily('monospace')
                                                .run()
                                        }
                                        formatName="font family"
                                        className={clsx(
                                            'w-full rounded-none px-4 text-left',
                                            editor.isActive({
                                                fontFamily: 'monospace',
                                            })
                                                ? ''
                                                : ''
                                        )}
                                    >
                                        <p
                                            className="text-slate-700"
                                            style={{ fontFamily: 'monospace' }}
                                        >
                                            monospace
                                        </p>
                                    </MenuButton>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {() => (
                                    <MenuButton
                                        title="Set Cursive Font Family"
                                        isDisabled={false}
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setFontFamily('cursive')
                                                .run()
                                        }
                                        formatName="font family"
                                        className={clsx(
                                            'w-full rounded-none px-4 text-left',
                                            editor.isActive({
                                                fontFamily: 'cursive',
                                            })
                                                ? ''
                                                : ''
                                        )}
                                    >
                                        <p
                                            className="text-slate-700"
                                            style={{ fontFamily: 'cursive' }}
                                        >
                                            cursive
                                        </p>
                                    </MenuButton>
                                )}
                            </Menu.Item>
                        </div>
                    </>
                </BaseDropdown>
            </div>

            {/*  Indentation */}
            <div className="flex items-center justify-center gap-x-1">
                <MenuButton
                    title="Text Left"
                    isDisabled={false}
                    onClick={() =>
                        editor.chain().focus().setTextAlign('left').run()
                    }
                    formatName="text left"
                    className={clsx(
                        editor.isActive({ textAlign: 'left' })
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700'
                    )}
                >
                    <RxTextAlignLeft className="h-5 w-5" />
                </MenuButton>
                <MenuButton
                    title="Text Center"
                    isDisabled={false}
                    onClick={() =>
                        editor.chain().focus().setTextAlign('center').run()
                    }
                    formatName="text center"
                    className={clsx(
                        editor.isActive({ textAlign: 'center' })
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700'
                    )}
                >
                    <RxTextAlignCenter className="h-5 w-5" />
                </MenuButton>
                <MenuButton
                    title="Text Right"
                    isDisabled={false}
                    onClick={() =>
                        editor.chain().focus().setTextAlign('right').run()
                    }
                    formatName="text right"
                    className={clsx(
                        editor.isActive({ textAlign: 'right' })
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700'
                    )}
                >
                    <RxTextAlignRight className="h-5 w-5" />
                </MenuButton>
                <MenuButton
                    title="Justify Text"
                    isDisabled={false}
                    onClick={() =>
                        editor.chain().focus().setTextAlign('justify').run()
                    }
                    formatName="text justify"
                    className={clsx(
                        editor.isActive({ textAlign: 'justify' })
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700'
                    )}
                >
                    <RxTextAlignJustify className="h-5 w-5" />
                </MenuButton>
            </div>
        </div>
    );
};

{
    /* <>
    <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
            editor.isActive('bold')
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        bold
    </button>
    <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
            editor.isActive('italic')
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        italic
    </button>
    <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
            editor.isActive('strike')
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        strike
    </button>
    <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
            editor.isActive('code')
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        code
    </button>
    <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={buttonStyling}
    >
        clear marks
    </button>
    <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={buttonStyling}
    >
        clear nodes
    </button>
    <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
            editor.isActive('paragraph')
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        paragraph
    </button>
    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
            editor.isActive('heading', { level: 1 })
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        h1
    </button>
    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
            editor.isActive('heading', { level: 2 })
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        h2
    </button>
    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
            editor.isActive('heading', { level: 3 })
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        h3
    </button>
    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
            editor.isActive('heading', { level: 4 })
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        h4
    </button>
    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
            editor.isActive('heading', { level: 5 })
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        h5
    </button>
    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
            editor.isActive('heading', { level: 6 })
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        h6
    </button>
    <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
            editor.isActive('bulletList')
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        bullet list
    </button>
    <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
            editor.isActive('orderedList')
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        ordered list
    </button>
    <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
            editor.isActive('codeBlock')
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        code block
    </button>
    <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
            editor.isActive('blockquote')
                ? `${buttonStyling} is-active`
                : `${buttonStyling}`
        }
    >
        blockquote
    </button>
    <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={buttonStyling}
    >
        horizontal rule
    </button>
    <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={buttonStyling}
    >
        hard break
    </button>
    <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={buttonStyling}
    >
        undo
    </button>
    <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={buttonStyling}
    >
        redo
    </button>
</>; */
}

export default MenuBar;
