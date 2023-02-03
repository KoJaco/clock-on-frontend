import { Extension } from '@tiptap/core';
import BaseCodeBlock from '@tiptap/extension-code-block';
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import ImageNode from './nodes/ImageNode';
// NODE EXTENSIONS

export default Node.create({
    name: 'imageNode',
    group: 'block',
    atom: true,
    draggable: true,

    // addAttributes() {
    //     return {};
    // },

    parseHTML() {
        return [
            {
                tag: 'image-node',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['image-node', mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageNode);
    },
});

// add before list extensions
// adding a literal tab should be a user defined customisation...
// "no keyboard trap - https://codemirror.net/examples/tab/"
// allow users to select whether they wish for a literal tab keyboard control.
export const LiteralIndent = Extension.create({
    name: 'LiteralIndent',

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                return this.editor.commands.insertContent('\t');
            },
        };
    },
});

// export const LiteralOutdent = Extension.create({
//     name: 'literalOutdent',

//     addKeyboardShortcuts() {
//         return {
//             'Shift-Tab': () => {
//                 return this.editor.commands.insertContent('\t');
//             },
//         };
//     },
// });

// extend BaseCodeBlock to allow users to insert tabs
export const TabbedCodeBlock = BaseCodeBlock.extend({
    addKeyboardShortcuts() {
        return {
            Tab: () => {
                console.log('test tab functionality');
                return this.editor.commands.insertContent('\t');
            },
        };
    },
});
