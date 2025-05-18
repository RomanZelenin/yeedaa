import {
    Flex,
    HStack,
    Image,
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

import { SuccessAlert } from '~/common/components/Alert/SuccessAlert';
import { AppLoader } from '~/common/components/Loader/AppLoader';
import { loadingSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { LoginForm } from './LoginForm/LoginForm';
import { VerificationFailedModal } from './Modal/VerificationFailedModal';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';

export const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoading = useAppSelector(loadingSelector);
    const tabs = useMemo(
        () => [
            { title: 'Вход на сайт', path: '/login', content: <LoginForm /> },
            { title: 'Регистрация', path: '/registration', content: <RegistrationForm /> },
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
                    position='relative'
                    p={{ base: '16px' }}
                    paddingTop={{ base: '72px', lg: '170px' }}
                    width={{ base: '100%', lg: '50%' }}
                    height='100vh'
                    spacing={0}
                >
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
                        flex={1}
                        display='flex'
                        flexDirection='column'
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
                        <TabPanels flex={1}>
                            {tabs.map((it, i) => (
                                <TabPanel key={i} flex={1} px={0} paddingTop={{ base: '40px' }}>
                                    {it.content}
                                </TabPanel>
                            ))}
                        </TabPanels>
                        {emailVerified !== undefined && (
                            <VerificationStatus emailVerified={emailVerified} />
                        )}
                        {successfulRecovery !== undefined && (
                            <SuccessAlert
                                position='absolute'
                                bottom='20px'
                                title='Восстановление данных успешно'
                                message=''
                            />
                        )}
                    </Tabs>
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
            bottom='20px'
            title='Верификация прошла успешно'
            message=''
        />
    ) : (
        <VerificationFailedModal />
    );
