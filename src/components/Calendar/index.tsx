import {
    useMemo,
    useState,
} from 'react';

import {
    EnglishDate,
    YearAndMonth,
} from '#utils/date-utils';

import Header from './Header';
import MonthlyGrid from './MonthlyGrid';

import styles from './styles.module.css';

function Calendar() {
    const currentYearMonth = useMemo(() => {
        const today = EnglishDate.fromNativeDate(new Date()).toNepaliDate();

        return {
            year: today.year,
            month: today.month,
        };
    }, []);

    const [yearAndMonth, setYearAndMonth] = useState<YearAndMonth>(currentYearMonth);

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
            <MonthlyGrid
                className={styles.datesGrid}
                yearAndMonth={yearAndMonth}
            />
        </div>
    );
}

export default Calendar;
