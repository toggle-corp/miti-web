import tithiDataAll from '../assets/dump.json';

import {
    NepaliDate,
    EnglishDate,
    NEPALI_DAYS_PER_MONTH,
    START_NEPALI_YEAR,
} from './date-utils';
import { translateNum } from './lang';

export interface DateInfo {
    key: string;
    nepaliDate?: number;
    englishDate?: number;
    tithi?: string;
    event?: string;
    holiday?: boolean;
    title?: string;
    isToday?: boolean;
}

const getMonthlyData = (year: number, month: number): DateInfo[][] => {
    const todayDate = EnglishDate.fromNativeDate(new Date()).toNepaliDate();
    const isTodayMonth = (year === todayDate.year && month === todayDate.month);

    const startNepaliDate = new NepaliDate(year, month, 1);
    const startEnglishDate = EnglishDate.fromNepaliDate(startNepaliDate);

    const startNativeDate = startEnglishDate.toNativeDate();
    const startingDayOfWeek = startNativeDate.getDay();

    const monthlyData: DateInfo[][] = [];
    const maxDate = NEPALI_DAYS_PER_MONTH[year - START_NEPALI_YEAR][month - 1];

    const tmpDate = new Date(startNativeDate);

    let date = 1;
    let tithiData;
    if (year >= tithiDataAll.init_year && year <= tithiDataAll.end_year) {
        tithiData = tithiDataAll.data[year][month];
    }

    for (let i = 0; i < 6; i += 1) {
        const weeklyData: DateInfo[] = [];
        for (let j = 0; j < 7; j += 1) {
            if ((i === 0 && j < startingDayOfWeek) || date > maxDate) {
                weeklyData.push({
                    key: `${j}`,
                });
            } else {
                const extra = tithiData && ({
                    tithi: tithiData[date - 1].tithi,
                    event: tithiData[date - 1].extra.event,
                    holiday: (j === 6) || tithiData[date - 1].extra.holiday,
                });
                let title = `${translateNum(year)}/${translateNum(month)}/${translateNum(date)}`;
                if (extra.tithi) {
                    title += `\n${extra.tithi}`;
                }
                if (extra.event) {
                    title += `\n${extra.event}`;
                }

                weeklyData.push({
                    key: `${j}`,
                    nepaliDate: date,
                    englishDate: tmpDate.getDate(),
                    title,
                    isToday: (isTodayMonth && date === todayDate.day),
                    ...extra,
                });
                date += 1;
                tmpDate.setDate(tmpDate.getDate() + 1);
            }
        }
        monthlyData.push(weeklyData);
    }

    return monthlyData;
};

export default getMonthlyData;
