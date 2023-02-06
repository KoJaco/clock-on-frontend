export interface Position {
    x: number;
    y: number;
}

export interface ScrollProps {
    previousPos: Position;
    currentPos: Position;
}

export type ElementRef = MutableRefObject<HTMLElement | null>;
