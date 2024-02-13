import { Input, Select } from 'antd';
import { FC, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../lib/hooks/useDebounce';
import usersStore from '../../store/usersStore';
import { observer } from 'mobx-react-lite';
import cls from './UserFilters.module.scss';

interface UserFiltersProps {
    onFiltersChange: () => void;
    className?: string;
}

//опции возрастов
const ageOptions = new Array(82).fill(undefined).map((_, idx) => ({
    value: (idx + 18).toString(),
    label: <span>{(idx + 18).toString()}</span>,
}))

export const UserFilters: FC<UserFiltersProps> = observer(({ onFiltersChange }) => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const searchFromUrl = searchParams.get('search') || '';
        const ageFromUrl = searchParams.get('age') || undefined;

        usersStore.changeSearch(searchFromUrl);
        usersStore.changeAge(ageFromUrl);

    }, [searchParams]);

    const onFiltersChangeDebounced = useDebounce(onFiltersChange, 500);

    const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        usersStore.changeSearch(e.target.value);
        onFiltersChangeDebounced();
    }, [onFiltersChangeDebounced]);

    const onAgeChange = useCallback((value: string) => {
        usersStore.changeAge(value);
        onFiltersChange();
    }, [onFiltersChange]);

    return (
        <div className={cls.UserFilter}>
            <Input value={usersStore.search} onChange={onSearchChange} placeholder="Поиск пользователя..." allowClear className={cls.filterInput} />
            <Select value={usersStore.age} onChange={onAgeChange} options={ageOptions} placeholder="Возраст" allowClear className={cls.filterSelect} />
        </div>
    );
});
