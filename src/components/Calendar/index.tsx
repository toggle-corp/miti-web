import React, { useState, useMemo, useCallback } from 'react';

import { EnglishDate, YearAndMonth } from '#utils/date-utils';

import NavBar from '../NavBar';
import Header from './Header';
import WeekNames from './WeekNames';
import MonthlyGrid from './MonthlyGrid';

import styles from './styles.scss';


const Calendar: React.FC = () => {
    const today = useMemo(() => {
        const todayDate = EnglishDate.fromNativeDate(new Date()).toNepaliDate();
        return {
            year: todayDate.year,
            month: todayDate.month,
        };
    }, []);
    const [yearAndMonth, setYearAndMonth] = useState<YearAndMonth>(today);

    const handleTodayButton = useCallback(() => {
        setYearAndMonth(today);
    }, [setYearAndMonth, today]);

    return (
        <div className={styles.calendar}>
            <NavBar className={styles.navBar} onTodayButton={handleTodayButton} />
            <Header
                className={styles.header}
                setYearAndMonth={setYearAndMonth}
                yearAndMonth={yearAndMonth}
            />
            <WeekNames className={styles.weekNames} />
            <MonthlyGrid
                className={styles.datesGrid}
                yearAndMonth={yearAndMonth}
            />
        </div>
    );
};

export default Calendar;
