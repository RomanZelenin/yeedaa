import { Grid, GridItem, Show } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { CustomAlert } from '~/common/components/Alert/CustomAlert';
import { AsidePanel } from '~/common/components/AsidePanel/AsidePanel';
import { Header } from '~/common/components/Header/Header';
import { AppLoader } from '~/common/components/Loader/AppLoader';
import { BottomMenu } from '~/common/components/Menu/BottomMenu';
import { SideMenu } from '~/common/components/Menu/SideMenu';
import { useGetMyProfileData } from '~/common/hooks/useGetMyProfileData';
import { useScrollToAnchor } from '~/common/hooks/useScrollToAnchor';
import { ApplicationRoute } from '~/router';
import {
    Error,
    loadingSelector,
    notificationSelector,
    setMyProfile,
    setMyProfileLoader,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export default function App() {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(loadingSelector);
    const notification = useAppSelector(notificationSelector);
    const accessToken = sessionStorage.getItem('access_token');
    useScrollToAnchor();

    const {
        isError: isErrorGetMyProfile,
        isLoading: isLoadingGetMyProfile,
        isSuccess: isSuccessGetMyProfile,
        isFetching,
        data: dataMyProfile,
    } = useGetMyProfileData(accessToken);

    useEffect(() => {
        if (isLoadingGetMyProfile) {
            dispatch(setMyProfileLoader(true));
        } else if (isErrorGetMyProfile) {
            dispatch(setMyProfileLoader(false));
        } else if (isSuccessGetMyProfile) {
            dispatch(setMyProfileLoader(false));
            dispatch(setMyProfile(dataMyProfile!));
        }
    }, [isSuccessGetMyProfile, isLoadingGetMyProfile, isErrorGetMyProfile, isFetching]);

    if (accessToken === null) return <Navigate to='/login' replace />;

    const isShowAsidePanel =
        location.pathname !== ApplicationRoute.NEW_RECIPE &&
        location.pathname.split('/')[1] !== ApplicationRoute.EDIT_RECIPE.split('/')[1] &&
        location.pathname.split('/')[1] !== ApplicationRoute.EDIT_DRAFT.split('/')[1];

    const isShowNotification = notification && notification.title !== Error.RECEPIES_NOT_FOUND;

    return (
        <>
            <AppLoader isLoading={isLoading}>
                <Header />
                <Grid
                    maxW='1920px'
                    margin='auto'
                    templateAreas={{
                        base: `"header"
                            "main"
                            "footer"`,
                        lg: `"header header header"
                         "nav main aside"`,
                    }}
                    gridTemplateRows={{
                        base: '64px 1fr 84px',
                        md: '80px 1fr 96px',
                        lg: '80px 1fr',
                    }}
                    gridTemplateColumns={{ base: '1fr', lg: '256px 1fr 208px' }}
                >
                    <GridItem area='header'></GridItem>
                    <Show above='lg'>
                        <GridItem area='nav' data-test-id='nav'>
                            <SideMenu />
                        </GridItem>
                    </Show>
                    <GridItem
                        area='main'
                        px='0px'
                        py={{ base: '16px', lg: '32px' }}
                        mr={{ lg: '73px' }}
                        ml={{ lg: '24px' }}
                    >
                        <Grid templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(12, 1fr)' }}>
                            <Outlet />
                        </Grid>
                    </GridItem>
                    <GridItem area='aside' hideBelow='lg'>
                        {isShowAsidePanel && <AsidePanel />}
                    </GridItem>
                    <GridItem area='footer' hideFrom='lg'>
                        <BottomMenu />
                    </GridItem>
                    {isShowNotification && (
                        <CustomAlert
                            position='fixed'
                            key={notification._id}
                            notification={notification}
                            bottom={{ base: '106px', md: '112px' }}
                        />
                    )}
                </Grid>
            </AppLoader>
        </>
    );
}
