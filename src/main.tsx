import './theme/styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';

import { store } from '~/store/configure-store.ts';

import Index from './app/Index';
import Home from './app/pages/Home';
import MostPopular from './app/pages/MostPopular';
import VegetarianKitchen from './app/pages/VegetarianKitchen';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Index />}>
                            <Route index element={<Home />} />
                            <Route path='most_popular' element={<MostPopular />} />
                            <Route
                                path='vegan-cuisine/:category?'
                                element={<VegetarianKitchen />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ChakraProvider>
    </StrictMode>,
);
