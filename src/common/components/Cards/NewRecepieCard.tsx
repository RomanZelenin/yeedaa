import {
    Box,
    Card,
    CardBody,
    Flex,
    Hide,
    Image,
    Show,
    Tag,
    TagLabel,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { useResource } from '../ResourceContext/ResourceContext';
import { ThreeButtons } from './ThreeButtons';

export const NewRecepieCard = ({
    categories,
    title,
    cover,
    description,
    bookmarksCount,
    likesCount,
    personsCount,
}: {
    categories: string[];
    title: string;
    cover: string;
    description?: string;
    bookmarksCount?: number;
    likesCount?: number;
    personsCount?: number;
}) => {
    const { getString, getPicture } = useResource();
    return (
        <Card
            w={{ base: '158px', lg: '279px', xl: '322px' }}
            h={{ base: '224px', lg: '402px', xl: '414px' }}
            border='1px solid rgba(0, 0, 0, 0.08);'
            borderRadius='8px'
            overflow='clip'
            boxShadow='none'
        >
            <CardBody p={0} display='flex' flexDir='column' justifyContent='stretch'>
                <Image
                    src={cover}
                    objectFit='cover'
                    w={{ base: '158px', lg: '277px', xl: '322px' }}
                    h={{ base: '128px', lg: '230px' }}
                />
                <Wrap
                    display={{ base: 'inline-flex', lg: 'none' }}
                    pos='absolute'
                    top='6px'
                    left='6px'
                    right='6px'
                >
                    {categories.map((category, i) => (
                        <WrapItem key={i}>
                            <Tag layerStyle='categoryTag' bgColor=' lime.150'>
                                <Image src={getPicture(category)} boxSize='16px' />
                                <TagLabel textStyle='textSmLh5'>{getString(category)}</TagLabel>
                            </Tag>
                        </WrapItem>
                    ))}
                </Wrap>
                <VStack
                    mx={{ base: '8px', lg: '12px', xl: '24px' }}
                    my={{ base: '8px', lg: '12px', xl: '16px' }}
                    spacing='8px'
                    align='stretch'
                    flex={1}
                >
                    <Text
                        textStyle={{
                            base: 'textMdLh6Medium',
                            lg: 'textLgLh7Medium',
                            xl: 'textXlLh7Medium',
                        }}
                        noOfLines={{ base: 2, lg: 1 }}
                    >
                        {title}
                    </Text>

                    <Box display={{ base: 'none', lg: 'inline-block' }} mb='16px'>
                        <Text textStyle={{ base: 'textSmLh5' }} noOfLines={3}>
                            {description}
                        </Text>
                    </Box>
                    <Hide above='lg'>
                        <Flex flex={1} alignItems='end'>
                            <ThreeButtons
                                bookmarksCount={bookmarksCount}
                                likesCount={likesCount}
                                personsCount={personsCount}
                            />
                        </Flex>
                    </Hide>
                    <Show above='lg'>
                        <Flex justify='space-between' flex={1} alignItems='end'>
                            {categories.slice(0, 1).map((category, i) => (
                                <Tag key={i} layerStyle='categoryTag' bgColor=' lime.150'>
                                    <Image src={getPicture(category)} boxSize='16px' />
                                    <TagLabel textStyle='textSmLh5'>{getString(category)}</TagLabel>
                                </Tag>
                            ))}
                            <ThreeButtons
                                bookmarksCount={bookmarksCount}
                                likesCount={likesCount}
                                personsCount={personsCount}
                            />
                        </Flex>
                    </Show>
                </VStack>
            </CardBody>
        </Card>
    );
};
