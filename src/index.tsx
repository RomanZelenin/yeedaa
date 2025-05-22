import './theme/styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';

import { store } from '~/store/configure-store.ts';

import App from './app/App';
import CategoryPage from './app/pages/Category/CategoryPage';
import { ErrorPage } from './app/pages/Error/ErrorPage';
import HomePage from './app/pages/Home/HomePage';
import JuiciestPage from './app/pages/Juiciest/JuiciestPage';
import { LoginPage } from './app/pages/Login/LoginPage';
import { RecipePage } from './app/pages/Recepie/RecipePage';
import { VerificationPage } from './app/pages/Verification/VerificationPage';
import { ResourceProvider } from './common/components/ResourceContext/ResourceContext';
import theme from './theme';

export enum ApplicationRoute {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    JUICIEST = '/the-juiciest',
    VERIFICATION = '/verification',
    NOT_FOUND = '/not-found',
    JUICIEST_WITH_ID = '/the-juiciest/:id',
    CATEGORY_WITH_SUBCATEGORY = '/:category/:subcategory?',
    CATEGORY_WITH_SUBCATEGORY_AND_ID = '/:category/:subcategory/:id',
    INDEX = '/',
    ANY = '/*',
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ResourceProvider>
            <ChakraProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter basename='/'>
                        <Routes>
                            <Route path={ApplicationRoute.LOGIN} element={<LoginPage />}></Route>
                            <Route
                                path={ApplicationRoute.REGISTRATION}
                                element={<LoginPage />}
                            ></Route>
                            <Route
                                path={ApplicationRoute.VERIFICATION}
                                element={<VerificationPage />}
                            ></Route>
                            <Route path={ApplicationRoute.INDEX} element={<App />}>
                                <Route index element={<HomePage />} />
                                <Route
                                    path={ApplicationRoute.JUICIEST}
                                    element={<JuiciestPage />}
                                />
                                <Route
                                    path={ApplicationRoute.JUICIEST_WITH_ID}
                                    element={<RecipePage />}
                                />
                                <Route
                                    path={ApplicationRoute.CATEGORY_WITH_SUBCATEGORY}
                                    element={<CategoryPage />}
                                />
                                <Route
                                    path={ApplicationRoute.CATEGORY_WITH_SUBCATEGORY_AND_ID}
                                    element={<RecipePage />}
                                />
                                <Route path={ApplicationRoute.NOT_FOUND} element={<ErrorPage />} />
                                <Route path={ApplicationRoute.ANY} element={<ErrorPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ChakraProvider>
        </ResourceProvider>
    </StrictMode>,
);
