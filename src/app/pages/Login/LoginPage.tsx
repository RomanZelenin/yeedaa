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
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { SuccessAlert } from '~/common/components/Alert/SuccessAlert';
import { AppLoader } from '~/common/components/Loader/AppLoader';
import { loadingSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { VerificationFailedModal } from './VerificationFailedModal';

export const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoading = useAppSelector(loadingSelector);
    const paths = ['/login', '/registration'];

    const [searchParams] = useSearchParams();
    const emailVerified = searchParams.get('emailVerified');

    return (
        <>
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
                            index={paths.indexOf(location.pathname)}
                            onChange={(i) => navigate(paths[i])}
                        >
                            <TabList borderColor='blackAlpha.200'>
                                <Tab color='lime.800'>Вход на сайт</Tab>
                                <Tab color='lime.800'>Регистрация</Tab>
                            </TabList>

                            <TabPanels flex={1}>
                                <TabPanel flex={1} px={0} paddingTop={{ base: '40px' }}>
                                    <LoginForm />
                                </TabPanel>
                                <TabPanel px={0} paddingTop={{ base: '40px' }}>
                                    <RegistrationForm />
                                </TabPanel>
                            </TabPanels>
                            <VerificationStatus emailVerified={emailVerified} />
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
        </>
    );
};

const VerificationStatus = ({ emailVerified }: { emailVerified?: string | null }) => {
    if (emailVerified === null) {
        return null;
    }

    return emailVerified === 'true' ? (
        <SuccessAlert
            position='absolute'
            bottom='20px'
            title='Верификация прошла успешно'
            message=''
        />
    ) : (
        <VerificationFailedModal />
    );
};
