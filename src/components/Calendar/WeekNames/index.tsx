import { _cs } from '@togglecorp/fujs';

import styles from './styles.module.css';

const weekNames = [
    { key: '0', value: 'आइत' },
    { key: '1', value: 'सोम' },
    { key: '2', value: 'मंगल' },
    { key: '3', value: 'बुध' },
    { key: '4', value: 'बिही' },
    { key: '5', value: 'शुक्र' },
    { key: '6', value: 'शनि', holiday: true },
];

interface Props {
    value: string;
    holiday?: boolean;
}

function WeekName({ value, holiday }: Props) {
    return (
        <div className={_cs(styles.weekName, holiday ? styles.holiday : '')}>
            {value}
        </div>
    );
}

function WeekNames() {
    return weekNames.map((weekName) => (
        <WeekName
            key={weekName.key}
            value={weekName.value}
            holiday={weekName.holiday}
        />
    ));
}

export default WeekNames;
