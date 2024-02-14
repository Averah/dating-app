import { Spin } from 'antd';
import React, { FC, memo } from 'react';

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = memo(({ className }) => {
    return (
        <div className={className}>
            <Spin size="large" />
        </div>
    );
});
