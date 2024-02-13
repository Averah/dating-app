import React, { FC } from 'react';
import classNames from 'classnames';
import cls from './Loader.module.scss';
import { Spin } from 'antd';

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => {
    return (
        <div className={classNames(cls.Loader, className)}>
            <Spin size="large" />
        </div>
    );
};
