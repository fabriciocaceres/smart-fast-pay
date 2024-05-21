import { Resource } from "i18next";

export enum I18nLanguages {
    En = 'en',
    PtBr = 'pt_br',
    Es = 'es'
}

export type I18nType = {
    translate: (text: string, properties?: any) => string;
    changeLanguage: (language: I18nLanguages) => void;
    lang: I18nLanguages
};

export type I18nProviderType = { 
    resources: Resource;
    defaultNS?: string;
    children: JSX.Element | JSX.Element[] | string | string[];
}
