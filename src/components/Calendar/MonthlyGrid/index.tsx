import React, { useMemo, useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import ListView from '#rscv/List/ListView';
import getMonthlyData, { DateInfo } from '#utils/monthly-data';
import { YearAndMonth } from '#utils/date-utils';
import { translateNum } from '#utils/lang';

import styles from './styles.scss';


const DateElement: React.FC<{ dateInfo: DateInfo }> = ({ dateInfo }: { dateInfo: DateInfo }) => {
    const showDateInfo = useCallback(() => {
        alert(dateInfo.title);
    }, [dateInfo]);

    return (
        <div
            className={_cs(styles.dateElement, dateInfo.holiday ? styles.holiday : '')}
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

const getDateInfoKey = (dateInfo: DateInfo) => dateInfo.key;
const getDateInfoParams = (_key: string, dateInfo: DateInfo) => ({ dateInfo });

const WeeklyRow: React.FC<{ dates: DateInfo[] }> = ({ dates }: { dates: DateInfo[] }) => (
    <ListView
        className={styles.week}
        data={dates}
        renderer={DateElement}
        rendererParams={getDateInfoParams}
        keySelector={getDateInfoKey}
    />
);

const getWeeklyRowKey = (_weeklyData: DateInfo[], index: number) => `${index}`;
const getWeeklyRowParams = (_key: string, weeklyData: DateInfo[]) => ({
    dates: weeklyData,
});


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
        <ListView
            className={_cs(className, styles.datesGrid)}
            data={monthlyData}
            renderer={WeeklyRow}
            rendererParams={getWeeklyRowParams}
            keySelector={getWeeklyRowKey}
        />
    );
};

export default MonthlyGrid;
