import './theme/styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { store } from '~/store/configure-store.ts';

import { ResourceProvider } from './common/components/ResourceContext/ResourceContext';
import { router } from './router';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ResourceProvider>
            <ChakraProvider theme={theme}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </ChakraProvider>
        </ResourceProvider>
    </StrictMode>,
);
