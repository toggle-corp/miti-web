import { useState, useMemo } from 'react';

import { EnglishDate, YearAndMonth } from '#utils/date-utils';

import Header from './Header';
import WeekNames from './WeekNames';
import MonthlyGrid from './MonthlyGrid';

import styles from './styles.module.css';


function Calendar() {
    const today = useMemo(() => {
        // const todayDate = EnglishDate.fromNativeDate(new Date()).toNepaliDate();
        const todayDate = EnglishDate.fromNativeDate(new Date(2020, 1, 1)).toNepaliDate();

        return {
            year: todayDate.year,
            month: todayDate.month,
        };
    }, []);
    const [yearAndMonth, setYearAndMonth] = useState<YearAndMonth>(today);

    /*
    const handleTodayButton = useCallback(() => {
        setYearAndMonth(today);
    }, [setYearAndMonth, today]);
    */

    return (
        <div className={styles.calendar}>
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
