import React, { memo } from 'react';
import cn from 'classnames';
import styles from './Button.module.css';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = memo(({ children, className, ...otherProps }) => {
    return (
        <button className={cn(styles.Button, className)} {...otherProps}>
            {children}
        </button>
    );
});

export default Button;