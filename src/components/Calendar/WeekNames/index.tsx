import React from 'react';
import { _cs } from '@togglecorp/fujs';
import ListView from '#rscv/List/ListView';

import styles from './styles.scss';

interface WeekName {
    key: string;
    value: string;
    holiday?: boolean;
}

const weekNames = [
    { key: '0', value: 'आइत' },
    { key: '1', value: 'सोम' },
    { key: '2', value: 'मंगल' },
    { key: '3', value: 'बुध' },
    { key: '4', value: 'बिही' },
    { key: '5', value: 'शुक्र' },
    { key: '6', value: 'शनि', holiday: true },
];

const WeekName: React.FC<WeekName> = ({ value, holiday }: WeekName) => (
    <div className={_cs(styles.weekName, holiday ? styles.holiday : '')}>
        {value}
    </div>
);

const getWeekNameParams = (_key: string, data: WeekName) => data;
const getWeekNameKey = (data: WeekName) => data.key;

const WeekNames: React.FC<{ className?: string }> = ({ className }: { className? : string}) => (
    <ListView
        className={_cs(styles.weekNames, className)}
        data={weekNames}
        renderer={WeekName}
        keySelector={getWeekNameKey}
        rendererParams={getWeekNameParams}
    />
);

export default WeekNames;
