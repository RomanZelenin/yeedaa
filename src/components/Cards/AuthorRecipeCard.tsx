import {
    Avatar,
    Button,
    Card,
    CardBody,
    Flex,
    HStack,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

import { Profile } from '../Header/ProfileInfo';
import { ThreeButtons } from './ThreeButtons';

export const AuthorRecipeCard = ({ person }: { person: Profile }) => (
    <>
        <Card overflow='clip' flex={1} bgColor='lime.300' borderRadius='8px'>
            <CardBody p={{ base: '8px', md: '24px' }}>
                <Flex columnGap={{ base: '8px', md: '16px' }} align='center'>
                    <Avatar src={person.avatar} boxSize='96px' />
                    <VStack spacing={0} align='start' flex={1}>
                        <Text textStyle='textXsLh4Normal' alignSelf='end'>
                            Автор рецепта
                        </Text>
                        <Text textStyle={{ base: 'textLgLh7Semibold', md: 'text2xlLh8Bold' }}>
                            {person.firstName} {person.lastName}
                        </Text>
                        <Text textStyle='textSmLh5' color='blackAlpha.700'>
                            @{person.nickname}
                        </Text>
                        <HStack flex={1} width='100%' justify='space-between' mt={{ base: '16px' }}>
                            <Button
                                borderRadius='6px'
                                bgColor='blackAlpha.900'
                                p='8px'
                                leftIcon={
                                    <Image
                                        src='/src/assets/icons/subscribe.svg'
                                        boxSize={{ xl: '16px' }}
                                    />
                                }
                                h={{ base: '24px', lg: '32px', xl: '48px' }}
                            >
                                <Text
                                    color='white'
                                    textStyle={{
                                        base: 'textXsLh4Semibold',
                                        lg: 'textSmLh5Semibold',
                                        xl: 'textLgLh7Semibold',
                                    }}
                                >
                                    Подписаться
                                </Text>
                            </Button>
                            <ThreeButtons personsCount={1} />
                        </HStack>
                    </VStack>
                </Flex>
            </CardBody>
        </Card>
    </>
);
