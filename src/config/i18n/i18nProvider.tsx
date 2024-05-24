import i18n, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { FC, ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { initReactI18next } from 'react-i18next';

import { I18nLanguages, I18nType } from './I18nType';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import pt_BR from './locales/pt-BR/translation.json';

const localStorageI18nLang = localStorage.getItem('i18nextLng');

type Props = {
    children?: ReactNode;
};

const allResources: Resource = {
    en: en,
    es: es,
    pt_br: pt_BR
};

const initialValues: I18nType = {
    translate: (text: string, properties?: any) => text,
    changeLanguage: (language: I18nLanguages) => {},
    lang:(localStorageI18nLang as I18nLanguages) || I18nLanguages.PtBr
};

const I18nContext = createContext<I18nType>(initialValues);

const I18nProvider: FC<Props> = ({ children }) => {
    const [lang, setLang] = useState<I18nLanguages>(initialValues.lang);

    const formatResources = (): Resource => {
        const result: Resource = {};

        Object.keys(allResources).forEach(key => {
            result[key] = {
                translations: {
                    ...allResources[key],
                }
            };
        });

        return result;
    };

    const translate = (text: string, properties?: any) => {
        return i18n.t(text, properties) as string;
    };

    const changeLanguageMemo = useMemo(
        () => ({
            changeLanguage: (language: I18nLanguages) => {
                i18n.changeLanguage(language);
                setLang(language);
                localStorage.setItem('i18nextLng', language);
            }
        }),
        []
    );

    i18n.use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: formatResources(),
            lng: lang,
            ns: ['translations'],
            defaultNS: 'translations'
        });

    return <I18nContext.Provider value={{ translate, ...changeLanguageMemo, lang }}>{children}</I18nContext.Provider>;
};

const useI18n = (): I18nType => {
    const context = useContext(I18nContext);

    if (context === undefined) {
        throw new Error('useColorMode must be used within a ColorModeProvider');
    }

    return context;
};

export { I18nContext, I18nProvider, useI18n };
