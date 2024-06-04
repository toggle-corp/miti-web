import React, { useMemo, useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import getMonthlyData, { DateInfo } from '#utils/monthly-data';
import { YearAndMonth } from '#utils/date-utils';
import { translateNum } from '#utils/lang';

import styles from './styles.module.css';


const DateElement: React.FC<{ dateInfo: DateInfo }> = ({ dateInfo }: { dateInfo: DateInfo }) => {
    const showDateInfo = useCallback(() => {
        alert(dateInfo.title);
    }, [dateInfo]);

    const className = _cs(
        styles.dateElement,
        dateInfo.holiday ? styles.holiday : '',
        dateInfo.isToday ? styles.today : '',
    );

    return (
        <div
            className={className}
            title={dateInfo.title}
            onClick={showDateInfo}
            role="button"
            tabIndex={0}
            onKeyPress={showDateInfo}
        >
            <div className={styles.nepaliDate}>
                {dateInfo.nepaliDate && translateNum(dateInfo.nepaliDate)}
            </div>
            <div className={styles.englishDate}>
                {dateInfo.englishDate}
            </div>
            <div className={styles.tithi}>
                {dateInfo.tithi}
            </div>
            <div className={styles.event}>
                {dateInfo.event}
            </div>
        </div>
    );
};

const WeeklyRow: React.FC<{ dates: DateInfo[] }> = ({ dates }: { dates: DateInfo[] }) => (
    <div className={styles.week}>
        {dates.map(
            (date) => <DateElement key={date.key} dateInfo={date} />
        )}
    </div>
);

interface PropTypes {
    className?: string;
    yearAndMonth: YearAndMonth;
}

const MonthlyGrid: React.FC<PropTypes> = ({ className, yearAndMonth }: PropTypes) => {
    const monthlyData = useMemo(
        () => getMonthlyData(yearAndMonth.year, yearAndMonth.month),
        [yearAndMonth],
    );

    return (
        <div className={_cs(className, styles.datesGrid)}>
            {monthlyData.map((data, i) => (
                <WeeklyRow
                    key={i}
                    dates={data}
                />
            ))}
        </div>
    );
};

export default MonthlyGrid;
