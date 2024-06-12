import { useMemo } from 'react';
import {
    _cs,
    isDefined,
    isTruthyString,
} from '@togglecorp/fujs';

import Tooltip from '#components/Tooltip';
import { YearAndMonth } from '#utils/date-utils';
import { translateNum } from '#utils/lang';
import getMonthlyData, { DateInfo } from '#utils/monthly-data';

import WeekNames from '../WeekNames';

import styles from './styles.module.css';

function DateElement({ dateInfo }: { dateInfo: DateInfo }) {
    const className = _cs(
        styles.dateElement,
        dateInfo.holiday ? styles.holiday : '',
        dateInfo.isToday ? styles.today : '',
    );

    const eventList = dateInfo.event?.split('/')?.map(
        (eventItem) => eventItem.trim(),
    ).filter((eventItem) => isTruthyString(eventItem));

    const eventText = eventList?.join(', ');

    return (
        <div
            className={className}
            title={dateInfo.title}
        >
            <div className={styles.tithiAndDate}>
                <div className={styles.tithi}>
                    {dateInfo.tithi}
                </div>
                <div className={styles.englishDate}>
                    {dateInfo.englishDate}
                </div>
            </div>
            <div className={styles.nepaliDate}>
                {dateInfo.nepaliDate && translateNum(dateInfo.nepaliDate)}
            </div>
            <div
                className={styles.event}
                title={eventText}
            >
                {eventText}
            </div>
            {isDefined(dateInfo.nepaliDate) && (
                <Tooltip className={styles.tooltip}>
                    <h2>
                        {dateInfo.title}
                    </h2>
                    <div>
                        {dateInfo.tithi}
                    </div>
                    {eventList && eventList.length > 0 && (
                        <ul className={styles.eventList}>
                            {eventList.map((eventItem) => (
                                <li key={eventItem}>{eventItem}</li>
                            ))}
                        </ul>
                    )}
                </Tooltip>
            )}
        </div>
    );
}

function WeeklyRow({ dates }: { dates: DateInfo[] }) {
    return dates.map(
        (date) => <DateElement key={date.key} dateInfo={date} />,
    );
}

interface Props {
    className?: string;
    yearAndMonth: YearAndMonth;
}

function MonthlyGrid(props: Props) {
    const { className, yearAndMonth } = props;
    const monthlyData = useMemo(
        () => getMonthlyData(yearAndMonth.year, yearAndMonth.month),
        [yearAndMonth],
    );

    return (
        <div className={_cs(className, styles.monthlyGrid)}>
            <div className={styles.weekNames}>
                <WeekNames />
            </div>
            <div className={styles.datesGrid}>
                {monthlyData.map(({ week, data }) => (
                    <WeeklyRow
                        key={week}
                        dates={data}
                    />
                ))}
            </div>
        </div>
    );
}

export default MonthlyGrid;
