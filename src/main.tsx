import './index.css';

import { accordionAnatomy, tabsAnatomy } from '@chakra-ui/anatomy';
import { ChakraProvider, createMultiStyleConfigHelpers, extendTheme } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';

import { store } from '~/store/configure-store.ts';

import MostPopularPageContent from './app/MostPopularPageContent';
import StartPage from './app/StartPage';
import VegetarianKitchenPageContent from './app/VegetarianKitchenPageContent';
const breakpoints = {
    base: '0px',
    sm: '360px',
    md: '768px',
    lg: '1440px',
    xl: '1920px',
    '2xl': '3840px',
};

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    accordionAnatomy.keys,
);

const custom = definePartsStyle({
    container: {
        borderWidth: '0px',
    },
    root: {
        borderWidth: '0px',
    },
    button: {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
    },
});

const accordionTheme = defineMultiStyleConfig({
    variants: { custom },
});

const tabsHelpers = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const tabsStyle = tabsHelpers.definePartsStyle({
    tab: {
        _selected: { color: '#2DB100', borderBottom: '4px solid' },
        fontWeight: 500,
        whiteSpace: 'nowrap',
    },
});

const tabsTheme = tabsHelpers.defineMultiStyleConfig({
    baseStyle: tabsStyle,
});

const theme = extendTheme({
    breakpoints,
    components: { Accordion: accordionTheme, Tabs: tabsTheme },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<StartPage />}>
                            <Route path='most_popular' element={<MostPopularPageContent />} />
                            <Route
                                path='vegan-cuisine/:category?'
                                element={<VegetarianKitchenPageContent />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ChakraProvider>
    </StrictMode>,
);
