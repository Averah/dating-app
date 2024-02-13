import { useCallback, useRef } from 'react';

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timer = useRef<NodeJS.Timeout>();

    return useCallback(
        (...args: any[]) => {
            clearTimeout(timer.current as NodeJS.Timeout);
            timer.current = setTimeout(() => callback(...args), delay);
        },
        [callback, delay]
    );
};
