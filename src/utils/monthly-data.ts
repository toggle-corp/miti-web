import tithiDataAll from '../assets/dump.json';
import { NepaliDate, EnglishDate, NEPALI_DAYS_PER_MONTH, START_NEPALI_YEAR } from './date-utils';

export interface DateInfo {
    key: string;
    nepaliDate: number | undefined;
    englishDate: number | undefined;
    tithi: string | undefined;
    event: string | undefined;
    holiday: boolean | undefined;
}

const getMonthlyData = (year: number, month: number): DateInfo[][] => {
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
                    holiday: tithiData[date - 1].extra.holiday,
                });
                weeklyData.push({
                    key: `${j}`,
                    nepaliDate: date,
                    englishDate: tmpDate.getDate(),
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
