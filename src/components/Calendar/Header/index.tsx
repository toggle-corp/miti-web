import React, { useCallback, useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';
import Button from '#rsca/Button';
import Icon from '#rscg/Icon';

import {
    NepaliDate,
    EnglishDate,
    YearAndMonth,
    START_NEPALI_YEAR,
    NUM_YEARS,
} from '#utils/date-utils';
import { translateNum } from '#utils/lang';
import styles from './styles.scss';


interface PropTypes {
    className?: string;
    yearAndMonth: YearAndMonth;
    setYearAndMonth: (yearAndMonth: YearAndMonth) => void;
}

const STARTING_MONTH = START_NEPALI_YEAR * 12;
const ENDING_MONTH = (START_NEPALI_YEAR + NUM_YEARS) * 12 + 11;

const MONTH_NAMES = [
    'बैशाख',
    'जेष्ठ',
    'अषाढ',
    'श्रावण',
    'भाद्र',
    'असोज',
    'कात्तिक',
    'मंसिर',
    'पौष',
    'माघ',
    'फाल्गुन',
    'चैत्र',
];

const Header: React.FC<PropTypes> = ({
    className,
    setYearAndMonth,
    yearAndMonth,
}: PropTypes) => {
    const monthId = yearAndMonth.year * 12 + (yearAndMonth.month - 1);
    const showPrevious = monthId > STARTING_MONTH;
    const showNext = monthId < ENDING_MONTH;

    // Go to previous month.
    const goToPrev = useCallback(() => {
        const newMonthId = monthId - 1;
        const year = Math.floor(newMonthId / 12);
        const month = (newMonthId % 12) + 1;

        setYearAndMonth({ year, month });
    }, [yearAndMonth, setYearAndMonth]);

    // Go to next month.
    const goToNext = useCallback(() => {
        const newMonthId = monthId + 1;
        const year = Math.floor(newMonthId / 12);
        const month = (newMonthId % 12) + 1;

        setYearAndMonth({ year, month });
    }, [yearAndMonth, setYearAndMonth]);

    // Nepali month-year title to display.
    const nepaliMonth: string = useMemo(() => {
        const monthName = MONTH_NAMES[yearAndMonth.month - 1];
        const yearName = translateNum(yearAndMonth.year);
        return `${monthName} ${yearName}`;
    }, [yearAndMonth]);

    // English month-year title to display.
    const englishMonth: string = useMemo(() => {
        const startEngDate = EnglishDate.fromNepaliDate(
            new NepaliDate(yearAndMonth.year, yearAndMonth.month, 1),
        ).toNativeDate();
        const endEngDate = EnglishDate.fromNepaliDate(
            new NepaliDate(yearAndMonth.year, yearAndMonth.month, 25),
        ).toNativeDate();

        const monthName1 = startEngDate.toLocaleString('en-US', { month: 'short' });
        const monthName2 = endEngDate.toLocaleString('en-US', { month: 'short' });

        const year1 = startEngDate.getFullYear();
        const year2 = endEngDate.getFullYear();

        if (year1 !== year2) {
            return `${monthName1} ${year1} / ${monthName2} ${year2}`;
        }

        return `${monthName1} / ${monthName2} ${year1}`;
    }, [yearAndMonth]);

    return (
        <div className={_cs(className, styles.header)}>
            {showPrevious && (
                <Button
                    className={styles.left}
                    onClick={goToPrev}
                    transparent
                >
                    <Icon name="chevronLeft" />
                </Button>
            )}

            <div className={styles.middle}>
                <div className={styles.nepaliMonth}>
                    {nepaliMonth}
                </div>
                <div className={styles.englishMonth}>
                    {englishMonth}
                </div>
            </div>

            {showNext && (
                <Button
                    className={styles.right}
                    onClick={goToNext}
                    transparent
                >
                    <Icon name="chevronRight" />
                </Button>
            )}
        </div>
    );
};

export default Header;
