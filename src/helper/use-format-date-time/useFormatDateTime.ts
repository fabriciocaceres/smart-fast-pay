import { useI18n } from '@/config';

const DAYS_OF_WEEK = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const MONTHS = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];

const localeMap = {
    en: 'mm/dd/yyyy',
    pt_br: 'dd/mm/yyyy'
};

export const useFormatDateTime = () => {
    const { lang } = useI18n();

    const fDateTime = (date: string) => {
        return new Date(date).toLocaleString(lang.replace('_', '-'));
    };

    const fDate = (date: string | Date) => {
        if (typeof date == "string") {
            date = new Date(date);
        }

        return date.toLocaleDateString(lang.replace('_', '-'));
    };

    const fTime = (date: string, timeStyle: 'short' | 'medium' = 'short') => {
        return new Date(date).toLocaleTimeString(lang.replace('_', '-'), { timeStyle });
    };

    const fTimestamp = (date: string) => {
        return new Date(date).getTime();
    };

    const fTimestampStartDay = (date: Date) => {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date.getTime();
    };

    const fTimestampEndDay = (date: Date) => {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(59);

        return date.getTime();
    };

    const fDateTimeStartDay = (date: Date) => {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    };

    const fDateTimeEndDay = (date: Date) => {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(59);

        return date;
    };

    const fDaysOfWeek = (date: string) => {
        return DAYS_OF_WEEK[new Date(date).getDay()];
    };

    const fMonth = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return MONTHS[date.getMonth()];
    };

    const fDay = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        const day = date.getDate();

        return day < 10 ? `0${day}` : day;
    };

    const fYear = (date: Date) => {
        const year = date.getFullYear();

        return year.toString().padStart(4, '0');
    };

    const fNumericMonth = (date: Date) => {
        const month = date.getMonth() + 1;

        return month < 10 ? `0${month}` : month;
    };

    const fNumericDayAndMonth = (date: Date) => {
        const day = fDay(date);
        const month = fNumericMonth(date);

        return `${day}/${month}`;
    };

    const fAgeByBirthDate = (birthDate: Date) => {
        const currentDate = new Date();
        var birthDateThisYear = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());

        let age: number = currentDate.getFullYear() - birthDate.getFullYear();

        return fDateTimeStartDay(birthDateThisYear) > fDateTimeStartDay(currentDate) ? age - 1 : age;
    };


    const fStringDateToLocalDate = (date: string) => {
        if (date == null || date == '') return null;

        const dateSplit = date.split('-');
        return new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]));
    };

    const fDateIgnoringTimezone = (date?: Date | null) => {
        if (!date) return null;

        return `${fYear(date)}-${fNumericMonth(date)}-${fDay(date)}`;
    };

    const fHoursAndMinutes = (date?: Date | string | null) => {
        if (!date) return null;

        if (typeof date === 'string') {
            date = new Date(date);
        }

        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }

    return {
        fDateTime,
        fDate,
        fTime,
        fTimestamp,
        fTimestampStartDay,
        fTimestampEndDay,
        fDaysOfWeek,
        fMonth,
        fDay,
        fYear,
        fNumericDayAndMonth,
        fDateTimeStartDay,
        fDateTimeEndDay,
        fAgeByBirthDate,
        fStringDateToLocalDate,
        fDateIgnoringTimezone,
        fHoursAndMinutes
    };
};
