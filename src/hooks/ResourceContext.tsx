import { createContext, ReactNode, useContext, useState } from 'react';

import icons from '~/locales/common/icons.json';
import ruStrings from '~/locales/ru/strings.json';

type Locale = 'en' | 'ru';
type Translations = Record<string, string>;
type LocaleDictionary = Record<Locale, Translations>;

interface ResourceContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    getString: (key: string) => string;
    getPicture: (key: string) => string;
}

const translations: LocaleDictionary = {
    en: {},
    ru: {
        ...ruStrings,
    },
};

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>('ru');

    const getString = (key: string): string => translations[locale][key] || key;

    const getPicture = (key: string): string => (icons as Record<string, string>)[key];

    return (
        <ResourceContext.Provider value={{ locale, setLocale, getString, getPicture }}>
            {children}
        </ResourceContext.Provider>
    );
};

export const useResource = () => {
    const context = useContext(ResourceContext);
    if (!context) {
        throw new Error('useResource must be used within a ResourceProvider');
    }
    return context;
};
