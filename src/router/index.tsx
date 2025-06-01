import { createBrowserRouter } from 'react-router';

import App from '~/app/App';
import CategoryPage from '~/app/pages/Category/CategoryPage';
import { CreateRecipePage } from '~/app/pages/CreateRecipe/CreateRecipePage';
import { ErrorPage } from '~/app/pages/Error/ErrorPage';
import HomePage from '~/app/pages/Home/HomePage';
import JuiciestPage from '~/app/pages/Juiciest/JuiciestPage';
import { LoginPage } from '~/app/pages/Login/LoginPage';
import { RecipePage } from '~/app/pages/Recepie/RecipePage';
import { VerificationPage } from '~/app/pages/Verification/VerificationPage';

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
    NEW_RECIPE = '/new-recipe',
    EDIT_RECIPE = '/edit-recipe/:category/:subcategory/:id',
    ANY = '/*',
}

export const router = createBrowserRouter(
    [
        {
            path: ApplicationRoute.LOGIN,
            element: <LoginPage />,
        },
        {
            path: ApplicationRoute.REGISTRATION,
            element: <LoginPage />,
        },
        {
            path: ApplicationRoute.VERIFICATION,
            element: <VerificationPage />,
        },
        {
            path: ApplicationRoute.INDEX,
            element: <App />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: ApplicationRoute.JUICIEST,
                    element: <JuiciestPage />,
                },
                {
                    path: ApplicationRoute.JUICIEST_WITH_ID,
                    element: <RecipePage />,
                },
                {
                    path: ApplicationRoute.CATEGORY_WITH_SUBCATEGORY,
                    element: <CategoryPage />,
                },
                {
                    path: ApplicationRoute.CATEGORY_WITH_SUBCATEGORY_AND_ID,
                    element: <RecipePage />,
                },
                {
                    path: ApplicationRoute.NEW_RECIPE,
                    element: <CreateRecipePage />,
                },
                {
                    path: ApplicationRoute.EDIT_RECIPE,
                    element: <CreateRecipePage />,
                },
                {
                    path: ApplicationRoute.NOT_FOUND,
                    element: <ErrorPage />,
                },
                {
                    path: ApplicationRoute.ANY,
                    element: <ErrorPage />,
                },
            ],
        },
    ],
    {
        basename: '/',
    },
);
