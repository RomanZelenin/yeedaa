import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    HStack,
    IconButton,
    Image,
    Stack,
    Tag,
    TagLabel,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { useResource } from '~/hooks/ResourceContext';

import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { ThreeButtons } from './ThreeButtons';

export const MostPopularCard = ({
    tags,
    avatar,
    recommendation,
    title,
    description,
    cover,
    bookmarks,
    likes,
    persons,
}: {
    tags: string[];
    avatar?: string;
    recommendation?: string;
    title: string;
    description: string;
    cover: string;
    bookmarks?: number;
    likes?: number;
    persons?: number;
}) => {
    const { getString, getPicture } = useResource();

    return (
        <Card direction='row' overflow='clip' minH='244px'>
            <Image src={cover} w='346px' />
            {recommendation ? (
                <Tag
                    py='4px'
                    px='8px'
                    pos='absolute'
                    layerStyle='categoryTag'
                    bgColor='lime.150'
                    bottom='20px'
                    left='24px'
                >
                    <Avatar src={avatar} boxSize='16px' />
                    <TagLabel textStyle='textSmLh5'>{recommendation}</TagLabel>
                </Tag>
            ) : (
                <></>
            )}

            <Stack spacing='4px' px='4px' flex={1}>
                <CardHeader>
                    <HStack spacing='50px' justify='space-between' alignItems='start'>
                        <Wrap>
                            {tags.map((it) => (
                                <WrapItem key={it}>
                                    <Tag layerStyle='categoryTag'>
                                        <Image src={getPicture(it)} boxSize='16px' />
                                        <TagLabel textStyle='textSmLh5'>{getString(it)}</TagLabel>
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                        <ThreeButtons
                            bookmarksCount={bookmarks}
                            likesCount={likes}
                            personsCount={persons}
                        />
                    </HStack>
                </CardHeader>
                <CardBody py={0}>
                    <Text textStyle='textXlLh7Medium' mb='8px' noOfLines={1}>
                        {title}
                    </Text>
                    <Text textStyle='textSmLh5Normal' noOfLines={3}>
                        {description}
                    </Text>
                </CardBody>
                <CardFooter flex={1} justifyContent='right' alignItems='end' columnGap='8px'>
                    <Button
                        variant='outline'
                        px='12px'
                        py='6px'
                        textStyle='textSmLh5Semibold'
                        leftIcon={<Image src='/src/assets/icons/bookmark.svg' />}
                        h='32px'
                        borderRadius='6px'
                        borderColor='blackAlpha.600'
                        borderWidth='1px'
                    >
                        Сохранить
                    </Button>
                    <Button
                        bgColor='blackAlpha.900'
                        color='white'
                        textStyle='textSmLh5Semibold'
                        alignItems='center'
                        px='12px'
                        py='6px'
                        h='32px'
                        borderRadius='6px'
                        borderColor='blackAlpha.200'
                        borderWidth='1px'
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export const MostPopularCardCompact = ({
    tags,
    title,
    cover,
    bookmarks,
    likes,
    persons,
}: {
    tags: string[];
    title: string;
    cover: string;
    bookmarks?: number;
    likes?: number;
    persons?: number;
}) => {
    const { getString, getPicture } = useResource();
    return (
        <Card direction='row' overflow='clip' minH='128px'>
            <Image src={cover} w='158px' />
            <Wrap pos='absolute' top='6px' left='6px' alignItems='center' maxW='158px'>
                {tags.map((it) => (
                    <WrapItem key={it}>
                        <Tag layerStyle='categoryTag'>
                            <Image src={getPicture(it)} boxSize='16px' />
                            <TagLabel textStyle='textSmLh5'>{getString(it)}</TagLabel>
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>

            <Stack spacing={0} flex={1} px='8px' pt='8px' pb='4px'>
                <CardHeader p={0}>
                    <ThreeButtons
                        bookmarksCount={bookmarks}
                        likesCount={likes}
                        personsCount={persons}
                    />
                </CardHeader>
                <CardBody p={0}>
                    <Text textStyle='textMdLh6Medium' noOfLines={2}>
                        {title}
                    </Text>
                </CardBody>
                <CardFooter p={0} justifyContent='right' columnGap='12px' alignItems='center'>
                    <IconButton
                        minW={0}
                        borderWidth='1px'
                        borderRadius='6px'
                        borderColor='blackAlpha.600'
                        bgColor='transparent'
                        boxSize='24px'
                        icon={<BookmarkIcon boxSize='12px' />}
                        aria-label=''
                    />

                    <Button
                        bgColor='black'
                        color='white'
                        fontSize='12px'
                        lineHeight='16px'
                        alignItems='center'
                        px='8px'
                        fontWeight={600}
                        h='1.5rem'
                        borderRadius='6px'
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};
