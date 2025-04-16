import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';

import ThreeButtons from './ThreeButtons';

function MostPopularCard({
    badgeText,
    avatar,
    recommendation,
    badgeIcon,
    title,
    description,
    cover,
    bookmarksCount,
    likesCount,
    personsCount,
}: {
    badgeText: string;
    avatar?: string;
    recommendation?: string;
    badgeIcon: string;
    title: string;
    description: string;
    cover: string;
    bookmarksCount?: number;
    likesCount?: number;
    personsCount?: number;
}) {
    return (
        <Card direction='row' overflow='clip' minW='340px' h='244px' flex={1}>
            <Box>
                <Image src={cover} />
                {typeof recommendation === 'string' ? (
                    <Badge
                        py='4px'
                        px='8px'
                        pos='absolute'
                        borderRadius='4px'
                        bgColor='lime.150'
                        display='inline-flex'
                        bottom='20px'
                        left='24px'
                        alignItems='center'
                        columnGap='8px'
                    >
                        <Avatar src={avatar} boxSize='16px' />
                        <Text
                            color='black'
                            fontSize='14px'
                            fontWeight='400'
                            textTransform='initial'
                        >
                            {recommendation}
                        </Text>
                    </Badge>
                ) : (
                    <></>
                )}
            </Box>
            <Stack spacing='24px' flex={1} px='24px' py='20px'>
                <CardHeader p='0px'>
                    <HStack spacing='50px' justify='space-between'>
                        <Badge borderRadius='4px' bgColor=' lime.50' display='inline-flex'>
                            <Image src={badgeIcon} />
                            <Text
                                color='black'
                                fontSize='14px'
                                fontWeight='400'
                                textTransform='initial'
                            >
                                {badgeText}
                            </Text>
                        </Badge>
                        <ThreeButtons
                            bookmarksCount={bookmarksCount}
                            likesCount={likesCount}
                            personsCount={personsCount}
                        />
                    </HStack>
                </CardHeader>
                <CardBody p={0}>
                    <Text fontSize='20px' fontWeight={500} lineHeight='28px' mb='8px' noOfLines={1}>
                        {title}
                    </Text>
                    <Text fontSize='14px' fontWeight={400} lineHeight='20px' noOfLines={3}>
                        {description}
                    </Text>
                </CardBody>
                <CardFooter
                    px='8px'
                    py='4px'
                    justifyContent='right'
                    columnGap='8px'
                    alignItems='center'
                >
                    <Button
                        variant='outline'
                        px='12px'
                        py='6px'
                        fontSize='14px'
                        leftIcon={<Image src='/src/assets/icons/bookmark.svg' />}
                        h='32px'
                    >
                        Сохранить
                    </Button>
                    <Button
                        bgColor='black'
                        color='white'
                        fontSize='14px'
                        alignItems='center'
                        px='12px'
                        py='6px'
                        h='32px'
                        borderRadius='6px'
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}

function MostPopularCardCompact({
    badgeText,
    badgeIcon,
    title,
    cover,
    bookmarksCount,
    likesCount,
    personsCount,
}: {
    badgeText: string;
    badgeIcon: string;
    title: string;
    cover: string;
    bookmarksCount?: number;
    likesCount?: number;
    personsCount?: number;
}) {
    return (
        <Card direction='row' overflow='clip' flex={1}>
            <Image src={cover} />
            <Badge
                borderRadius='4px'
                bgColor=' lime.50'
                display={{ base: 'inline-flex', lg: 'none' }}
                pos='absolute'
                top='6px'
                left='6px'
                alignItems='center'
            >
                <Image src={badgeIcon} />
                <Text color='black' fontSize='10pt' fontWeight='400' textTransform='initial'>
                    {badgeText}
                </Text>
            </Badge>
            <Stack spacing={0} flex={1} p='8px'>
                <CardHeader p='0px'>
                    <ThreeButtons
                        bookmarksCount={bookmarksCount}
                        likesCount={likesCount}
                        personsCount={personsCount}
                    />
                </CardHeader>
                <CardBody p={0}>
                    <Heading size='16px' fontWeight={500} lineHeight='24px' noOfLines={2}>
                        {title}
                    </Heading>
                </CardBody>
                <CardFooter p={0} justifyContent='right' columnGap='12px' alignItems='center'>
                    <Center
                        as='button'
                        boxSize='24px'
                        border=' 1px solid rgba(0, 0, 0, 0.48);'
                        borderRadius='6px'
                    >
                        <Image src='/src/assets/icons/bookmark.svg' />
                    </Center>

                    <Button
                        bgColor='black'
                        color='white'
                        fontSize='12px'
                        alignItems='center'
                        px='8px'
                        h='1.4rem'
                        borderRadius='6px'
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}

export { MostPopularCard, MostPopularCardCompact };
