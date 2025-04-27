import {
    Button,
    Flex,
    HStack,
    Image,
    Tag,
    TagLabel,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { useResource } from '~/components/ResourceContext/ResourceContext';

import { ThreeButtons } from './ThreeButtons';

export const RecipeCard = ({ recepie }: { recepie: Recipe }) => {
    const { getString, getPicture } = useResource();

    return (
        <>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                alignItems={{ md: 'start' }}
                rowGap={{ base: '16px' }}
                columnGap={{ md: '16px' }}
            >
                <Image
                    objectFit='cover'
                    src={recepie.image}
                    borderRadius='8px'
                    w={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
                    h={{ base: '224px', lg: '410px', xl: '410px' }}
                />
                <VStack w='100%' alignSelf={{ md: 'stretch' }}>
                    <HStack w='100%' justify='space-between' align='start'>
                        <Wrap flex={1}>
                            {recepie.category.map((category) => (
                                <WrapItem>
                                    <Tag layerStyle='categoryTag'>
                                        <Image
                                            src={getPicture(category)}
                                            boxSize='16px'
                                            alignSelf='center'
                                        />
                                        <TagLabel textStyle='textSmLh5'>
                                            {getString(category)}
                                        </TagLabel>
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                        <ThreeButtons
                            bookmarksCount={recepie.bookmarks}
                            likesCount={recepie.likes}
                        />
                    </HStack>
                    <Text
                        width='100%'
                        textStyle={{ base: 'text2xlLh8Bold', lg: 'text5xlLhNoneBold' }}
                        noOfLines={{ base: 2, md: 1, lg: 2 }}
                        mt={{ base: '16px' }}
                    >
                        {recepie.title}
                    </Text>
                    <Text
                        width='100%'
                        textStyle={{ base: 'textSmLh5Normal' }}
                        mt={{ base: '16px', lg: '24px' }}
                        noOfLines={{ base: 3, md: 2, lg: 3 }}
                    >
                        {recepie.description}
                    </Text>
                    <Wrap mt={{ base: '24px', md: 'auto' }} width='100%' justify='space-between'>
                        <WrapItem>
                            <Tag layerStyle='timerTag' alignSelf={{ base: 'start', lg: 'end' }}>
                                <Image
                                    src='/src/assets/icons/alarm.svg'
                                    boxSize='16px'
                                    alignSelf='center'
                                />
                                <TagLabel textStyle='textSmLh5'>{recepie.time}</TagLabel>
                            </Tag>
                        </WrapItem>
                        <WrapItem>
                            <HStack spacing={{ base: '12px' }} justify={{ md: 'end' }}>
                                <Button
                                    borderRadius='6px'
                                    variant='outline'
                                    px='12px'
                                    py='6px'
                                    leftIcon={
                                        <Image
                                            src='/src/assets/icons/like.svg'
                                            boxSize={{ xl: '16px' }}
                                        />
                                    }
                                    h={{ base: '24px', lg: '32px', xl: '48px' }}
                                >
                                    <Text
                                        textStyle={{
                                            base: 'textXsLh4Semibold',
                                            lg: 'textSmLh5Semibold',
                                            xl: 'textLgLh7Semibold',
                                        }}
                                    >
                                        {getString('rate-recipe')}
                                    </Text>
                                </Button>
                                <Button
                                    borderRadius='6px'
                                    bgColor='lime.400'
                                    variant='outline'
                                    px='12px'
                                    py='6px'
                                    leftIcon={
                                        <Image
                                            src='/src/assets/icons/bookmark.svg'
                                            boxSize={{ xl: '16px' }}
                                        />
                                    }
                                    h={{ base: '24px', lg: '32px', xl: '48px' }}
                                >
                                    <Text
                                        textStyle={{
                                            base: 'textXsLh4Semibold',
                                            lg: 'textSmLh5Semibold',
                                            xl: 'textLgLh7Semibold',
                                        }}
                                    >
                                        {getString('save-to-bookmarks')}
                                    </Text>
                                </Button>
                            </HStack>
                        </WrapItem>
                    </Wrap>
                </VStack>
            </Flex>
        </>
    );
};
