import './theme/styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';

import { store } from '~/store/configure-store.ts';

import CategoryPage from './app/pages/Category/CategoryPage';
import { ErrorView } from './app/pages/Error/ErrorView';
import HomePage from './app/pages/Home/HomePage';
import Index from './app/pages/Index';
import JuiciestPage from './app/pages/Juiciest/JuiciestPage';
import { RecipePage } from './app/pages/Recepie/RecipePage';
import { ResourceProvider } from './hooks/ResourceContext';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ResourceProvider>
            <ChakraProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Index />}>
                                <Route index element={<HomePage />} />
                                <Route path='the-juiciest' element={<JuiciestPage />} />
                                <Route path=':category/:subcategory' element={<CategoryPage />} />
                                <Route path=':category/:subcategory/:id' element={<RecipePage />} />
                                <Route path='/*' element={<ErrorView />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ChakraProvider>
        </ResourceProvider>
    </StrictMode>,
);
