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
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { ErrorAlert } from '~/common/components/Alert/ErrorAlert';
import { SuccessAlert } from '~/common/components/Alert/SuccessAlert';
import { AppLoader } from '~/common/components/Loader/AppLoader';
import { Error, errorSelector, loadingSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { LoginForm } from './LoginForm/LoginForm';
import { VerificationFailedModal } from './Modal/VerificationFailedModal';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';

const LOGIN_PATH = '/login';
const REGISTRATION_PATH = '/registration';

export const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoading = useAppSelector(loadingSelector);
    const error = useAppSelector(errorSelector);
    const {
        isOpen: isOpenErrorAlert,
        onClose: onCloseErrorAlert,
        onOpen: onOpenErrorAlert,
    } = useDisclosure();

    useEffect(() => {
        if (error.value !== Error.NONE) {
            onOpenErrorAlert();
        } else {
            onCloseErrorAlert();
        }
    }, [error]);

    const tabs = useMemo(
        () => [
            { title: 'Вход на сайт', path: LOGIN_PATH, content: <LoginForm /> },
            { title: 'Регистрация', path: REGISTRATION_PATH, content: <RegistrationForm /> },
        ],
        [],
    );
    const emailVerified: boolean | undefined = location.state?.emailVerified;
    const successfulRecovery: boolean | undefined = location.state?.successfulRecovery;

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
                        src='/src/assets/logo-md.svg'
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
                    {emailVerified !== undefined && (
                        <VerificationStatus emailVerified={emailVerified} />
                    )}
                    {successfulRecovery !== undefined && (
                        <SuccessAlert
                            position='absolute'
                            bottom='60px'
                            title='Восстановление данных успешно'
                            message=''
                        />
                    )}
                    <ErrorAlert
                        isOpen={isOpenErrorAlert}
                        onClose={onCloseErrorAlert}
                        bottom='50px'
                        title={error.value}
                        message={error.message ?? ''}
                        position='absolute'
                    />
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
                    backgroundImage='/src/assets/images/auth-background-image.png'
                >
                    <Text p='10px' textStyle='textXsLh4Semibold'>
                        ̶ Лучший сервис для ваших кулинарных побед
                    </Text>
                </Flex>
            </HStack>
        </AppLoader>
    );
};

const VerificationStatus = ({ emailVerified }: { emailVerified: boolean }) =>
    emailVerified ? (
        <SuccessAlert
            position='absolute'
            bottom='60px'
            title='Верификация прошла успешно'
            message=''
        />
    ) : (
        <VerificationFailedModal />
    );
