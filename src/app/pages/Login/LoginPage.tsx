import {
    Flex,
    HStack,
    Image,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

import loginBgImg from '~/assets/images/auth-background-image.png';
import logoImg from '~/assets/logo-md.svg';
import { CustomAlert } from '~/common/components/Alert/CustomAlert';
import { AppLoader } from '~/common/components/Loader/AppLoader';
import { ApplicationRoute } from '~/router';
import { loadingSelector, notificationSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { LoginForm } from './LoginForm/LoginForm';
import { VerificationFailedModal } from './Modal/VerificationFailedModal';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';

export const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoading = useAppSelector(loadingSelector);
    const notification = useAppSelector(notificationSelector);
    const tabs = useMemo(
        () => [
            { title: 'Вход на сайт', path: ApplicationRoute.LOGIN, content: <LoginForm /> },
            {
                title: 'Регистрация',
                path: ApplicationRoute.REGISTRATION,
                content: <RegistrationForm />,
            },
        ],
        [],
    );
    const emailVerified: boolean | undefined = location.state?.emailVerified;

    return (
        <AppLoader isLoading={isLoading}>
            <HStack
                spacing={0}
                p={0}
                height='100vh'
                width='100%'
                background='linear-gradient(236.9deg, #EAFFC7 30.27%, #29813F 136.1%), #FFFFFF'
            >
                <VStack
                    justifyContent='space-between'
                    position='relative'
                    p={{ base: '16px' }}
                    width={{ base: '100%', lg: '50%' }}
                    height='100vh'
                    spacing={0}
                >
                    <Spacer />
                    <Image
                        width={{ base: '158px', lg: '271px' }}
                        height={{ base: '38px', lg: '64px' }}
                        src={logoImg}
                        mb={{ base: '40px', lg: '80px' }}
                    />
                    <Tabs
                        isLazy
                        lazyBehavior='unmount'
                        w={{ base: '100%', md: '355px', lg: '451px', xl: '461px' }}
                        isFitted
                        index={tabs.findIndex((it) => it.path === location.pathname)}
                        onChange={(i) => navigate(tabs[i].path)}
                    >
                        <TabList borderColor='blackAlpha.200'>
                            {tabs.map((it, i) => (
                                <Tab key={i} color='lime.800'>
                                    {it.title}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {tabs.map((it, i) => (
                                <TabPanel key={i} px={0} paddingTop={{ base: '40px' }}>
                                    {it.content}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                    {notification && (
                        <CustomAlert
                            position='absolute'
                            key={notification._id}
                            notification={notification}
                            bottom='60px'
                        />
                    )}

                    {emailVerified !== undefined && !emailVerified && <VerificationFailedModal />}
                    <Spacer />
                    <Text
                        bgColor='transparent'
                        p='10px'
                        textStyle='textXsLh4Semibold'
                        alignSelf='start'
                    >
                        Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                    </Text>
                </VStack>
                <Flex
                    p='20px'
                    alignItems='end'
                    justifyContent='end'
                    backgroundSize='cover'
                    bgRepeat='no-repeat'
                    display={{ base: 'none', lg: 'flex' }}
                    width='50%'
                    h='100vh'
                    backgroundImage={loginBgImg}
                >
                    <Text p='10px' textStyle='textXsLh4Semibold'>
                        ̶ Лучший сервис для ваших кулинарных побед
                    </Text>
                </Flex>
            </HStack>
        </AppLoader>
    );
};
