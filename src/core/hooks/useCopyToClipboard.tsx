import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // return success fn

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const [copied, setCopied] = useState<CopiedValue>(null);

    const copy: CopyFn = async (text) => {
        if (!navigator?.clipboard) {
            console.warn('Copying to clipboard is not supported');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopied(text);
            return true;
        } catch (err) {
            console.error('Failed to copy!', err);
            setCopied(null);
            return false;
        }
    };

    return [copied, copy];
}
