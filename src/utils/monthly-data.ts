import { listToGroupList } from '@togglecorp/fujs';

import {
    EnglishDate,
    NEPALI_DAYS_PER_MONTH,
    NepaliDate,
    START_NEPALI_YEAR,
} from './date-utils';
import { translateNum } from './lang';

import mitiData from './miti-data.json';

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

function getKeyFromYearAndMonth(year: number, month: number) {
    return `${year}-${month}`;
}

const yearAndMonthGroupedMitiData = listToGroupList(
    mitiData,
    ({ yearNp, monthNp }) => getKeyFromYearAndMonth(yearNp, monthNp),
);

function getMonthlyData(year: number, month: number) {
    const today = EnglishDate.fromNativeDate(new Date()).toNepaliDate();
    const isCurrentMonth = (year === today.year && month === today.month);

    const startNepaliDate = new NepaliDate(year, month, 1);
    const startEnglishDate = EnglishDate.fromNepaliDate(startNepaliDate);

    const startNativeDate = startEnglishDate.toNativeDate();
    const startingDayOfWeek = startNativeDate.getDay();

    interface MonthlyData {
        week: number;
        data: DateInfo[];
    }

    const monthlyData: MonthlyData[] = [];
    const maxDate = NEPALI_DAYS_PER_MONTH[year - START_NEPALI_YEAR][month - 1];

    const tmpDate = new Date(startNativeDate);

    let date = 1;

    const currentMitiData = yearAndMonthGroupedMitiData[getKeyFromYearAndMonth(year, month)];

    for (let i = 0; i < 6; i += 1) {
        const weeklyData: DateInfo[] = [];

        for (let j = 0; j < 7; j += 1) {
            if ((i === 0 && j < startingDayOfWeek) || date > maxDate) {
                weeklyData.push({
                    key: `${j}`,
                });
            } else {
                const title = `${translateNum(year)}/${translateNum(month)}/${translateNum(date)}`;
                const mitiDataForTheDate = currentMitiData?.[date - 1];

                weeklyData.push({
                    key: `${j}`,
                    nepaliDate: date,
                    englishDate: tmpDate.getDate(),
                    title,
                    isToday: (isCurrentMonth && date === today.day),
                    event: mitiDataForTheDate?.event,
                    tithi: mitiDataForTheDate?.tithi,
                    holiday: mitiDataForTheDate?.isHoliday,
                });
                date += 1;
                tmpDate.setDate(tmpDate.getDate() + 1);
            }
        }
        monthlyData.push({
            week: i,
            data: weeklyData,
        });
    }

    return monthlyData;
}

export default getMonthlyData;
