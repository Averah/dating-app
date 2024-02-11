import React, { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...otherProps }, ref) => (
    <input ref={ref} className={cn(styles.customInput, className)} {...otherProps} />
));
