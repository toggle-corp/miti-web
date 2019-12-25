import React, { useState, useMemo } from 'react';
import { EnglishDate, YearAndMonth } from '#utils/date-utils';

import Header from './Header';
import WeekNames from './WeekNames';
import MonthlyGrid from './MonthlyGrid';

import styles from './styles.scss';


const Calendar: React.FC = () => {
    const today = useMemo(() => EnglishDate.fromNativeDate(new Date()).toNepaliDate(), []);
    const [yearAndMonth, setYearAndMonth] = useState<YearAndMonth>({
        year: today.year,
        month: today.month,
    });

    return (
        <div className={styles.calendar}>
            <Header
                setYearAndMonth={setYearAndMonth}
                yearAndMonth={yearAndMonth}
            />
            <WeekNames />
            <MonthlyGrid
                className={styles.datesGrid}
                yearAndMonth={yearAndMonth}
            />
        </div>
    );
};

export default Calendar;
