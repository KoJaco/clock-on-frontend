import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { MdDragIndicator } from 'react-icons/md';
type ImageNodeProps = {
    images: { caption: string; url: string }[];
};

const imageLoader = ({
    src,
    width,
    quality,
}: {
    src: string;
    width: number;
    quality?: number;
}) => {
    return `${src}?w=${width}&q=${quality || 75}`;
};

const ImageNode = () => {
    return (
        <NodeViewWrapper className="react-component">
            <div
                id="image-gallery"
                className="flex w-full flex-wrap gap-x-4 gap-y-4"
            >
                {/* Image display */}
                <div
                    id="image-wrapper"
                    className="flex w-full items-center sm:w-[30%]"
                    data-drag-handle
                >
                    <Image
                        loader={imageLoader}
                        src="/images/img-2.jpg"
                        alt=""
                        width={300}
                        height={300}
                        className="h-full w-full"
                    />
                </div>
                <div
                    id="image-wrapper"
                    className="flex w-full items-center sm:w-[30%]"
                    data-drag-handle
                >
                    <Image
                        loader={imageLoader}
                        src="/images/img-3.jpg"
                        alt=""
                        width={300}
                        height={300}
                        className="h-full w-full"
                    />
                </div>
                <div
                    id="image-wrapper"
                    className="flex w-full items-center sm:w-[30%]"
                    data-drag-handle
                >
                    <Image
                        loader={imageLoader}
                        src="/images/img-4.jpg"
                        alt=""
                        width={300}
                        height={300}
                        className="h-full w-full"
                    />
                </div>
            </div>
        </NodeViewWrapper>
    );
};

export default ImageNode;
