import { useI18n } from '@/config';

export const useFormatDateTime = () => {
    const { lang } = useI18n();

    const formatDate = (date: string | Date) => {
        if (typeof date == "string") {
            date = new Date(date);
        }

        return date.toLocaleDateString(lang.replace('_', '-'));
    };

    return {
        formatDate
    };
};
