import { ReactNode } from 'react';
import cls from './PageLayout.module.scss';

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className={cls.PageLayout}>
            {children}
        </div>
    )
};