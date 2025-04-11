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
    Flex,
    Heading,
    HStack,
    Image,
    Spacer,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';

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
                        bgColor='#D7FF94'
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
                        <Badge borderRadius='4px' bgColor=' #FFFFD3' display='inline-flex'>
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
                <CardBody px='8px' py='0px'>
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
                        leftIcon={<Image src='./src/assets/icons/bookmark.svg' />}
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

function MenuItemButton({ src, count }: { src: string; count: number }) {
    return (
        <Flex
            /* px={['8px', null, null, '8px']}
            py={['6px', null, null, '8px']} */
            alignItems='center'
            columnGap={['6px', null, null, '8px']}
        >
            <Image src={src} boxSize={['12px', null, null, '12px']} />
            <Box
                as='span'
                fontSize={['12px', null, null, '16px']}
                lineHeight={['16px', null, null, '24px']}
                fontWeight='600'
                color='#2db100'
            >
                {count}
            </Box>
        </Flex>
    );
}

function NewRecepieCard({
    badgeText,
    badgeIcon,
    title,
    cover,
    description,
    bookmarksCount,
    likesCount,
    personsCount,
}: {
    badgeText: string;
    badgeIcon: string;
    title: string;
    cover: string;
    description?: string;
    bookmarksCount?: number;
    likesCount?: number;
    personsCount?: number;
}) {
    return (
        <Card
            minW={['158px', null, null, '279px', '322px']}
            maxW={['158px', null, null, '279px', '322px']}
            border='1px solid rgba(0, 0, 0, 0.08);'
            borderRadius='8px'
            overflow='clip'
            flex={1}
        >
            <CardBody p='0px' display='flex' flexDirection='column'>
                <Image src={cover} objectFit='cover' maxH='230px' maxW='322px' />
                <Badge
                    borderRadius='4px'
                    bgColor=' #d7ff94'
                    display={['inline-flex', null, null, 'none']}
                    pos='absolute'
                    top='6px'
                    left='6px'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Image src={badgeIcon} boxSize='16px' />
                    <Text color='black' fontSize='10pt' fontWeight='400' textTransform='initial'>
                        {badgeText}
                    </Text>
                </Badge>
                <VStack
                    mx={['8px', null, null, '12px', '24px']}
                    my={['8px', null, null, '12px', ' 16px']}
                    spacing='8px'
                    align='stretch'
                    flex={1}
                >
                    <Text
                        fontSize={['12pt']}
                        fontWeight='500'
                        lineHeight='150%'
                        noOfLines={[2, null, null, 1, 1]}
                        flex={1}
                    >
                        {title}
                    </Text>
                    <Box display={['none', null, null, 'inline-block']} mb='16px'>
                        <Text fontSize={['11pt']} lineHeight='20px' fontWeight='400' noOfLines={3}>
                            {description}
                        </Text>
                    </Box>
                    <Box display={['flex', null, null, 'none']}>
                        <ThreeButtons
                            bookmarksCount={bookmarksCount}
                            likesCount={likesCount}
                            personsCount={personsCount}
                        />
                    </Box>
                    <HStack display={['none', null, null, 'flex']} justify='space-between' flex={1}>
                        <Badge
                            borderRadius='4px'
                            bgColor=' #d7ff94'
                            display={['inline-flex']}
                            top='6px'
                            left='6px'
                        >
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
                </VStack>
            </CardBody>
        </Card>
    );
}

function ThreeButtons({
    bookmarksCount,
    likesCount,
    personsCount,
}: {
    bookmarksCount?: number;
    likesCount?: number;
    personsCount?: number;
}) {
    return (
        <HStack spacing='8px'>
            {typeof bookmarksCount === 'number' ? (
                <>
                    <Flex alignItems='center' columnGap={['6px']}>
                        <Image src='./src/assets/icons/bookmark.svg' boxSize={['12px']} />
                        <Box
                            as='span'
                            fontSize={['12px']}
                            lineHeight={['16px']}
                            fontWeight='600'
                            color='#2db100'
                        >
                            {bookmarksCount}
                        </Box>
                    </Flex>
                </>
            ) : (
                <></>
            )}
            {typeof likesCount === 'number' ? (
                <>
                    <Flex alignItems='center' columnGap={['6px']}>
                        <Image src='./src/assets/icons/like.svg' boxSize={['12px']} />
                        <Box
                            as='span'
                            fontSize={['12px']}
                            lineHeight={['16px']}
                            fontWeight='600'
                            color='#2db100'
                        >
                            {likesCount}
                        </Box>
                    </Flex>
                </>
            ) : (
                <></>
            )}
            {typeof personsCount === 'number' ? (
                <>
                    <Flex alignItems='center' columnGap={['6px']}>
                        <Image src='./src/assets/icons/persons.svg' boxSize={['12px']} />
                        <Box
                            as='span'
                            fontSize={['12px']}
                            lineHeight={['16px']}
                            fontWeight='600'
                            color='#2db100'
                        >
                            {personsCount}
                        </Box>
                    </Flex>
                </>
            ) : (
                <></>
            )}
        </HStack>
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
                bgColor=' #FFFFD3'
                display={['inline-flex', null, null, 'none']}
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
                        <Image src='./src/assets/icons/bookmark.svg' />
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

function BlogCard({
    person,
    comment,
}: {
    person: { firstName: string; lastName: string; nickname: string; avatar: string };
    comment: string;
}) {
    return (
        <>
            <Card p='16px' rowGap='16px' borderRadius='8px'>
                <CardHeader p={0}>
                    <Flex alignItems='center' columnGap={['8px', null, '12px']}>
                        <Avatar src={person.avatar} boxSize={['32px', null, null, '48px']} />
                        <Box minW={0}>
                            <Text
                                fontSize='16px'
                                fontWeight={500}
                                lineHeight='24px'
                                isTruncated
                                textOverflow='ellipsis'
                            >
                                {`${person.firstName} ${person.lastName}`}
                            </Text>
                            <Text
                                fontSize='14px'
                                fontWeight={400}
                                color='rgba(0, 0, 0, 0.64)'
                                noOfLines={1}
                            >
                                {person.nickname}
                            </Text>
                        </Box>
                    </Flex>
                </CardHeader>
                <CardBody p={0}>
                    <Text fontSize='14px' lineHeight='20px' fontWeight={400} noOfLines={3}>
                        {comment}
                    </Text>
                </CardBody>
            </Card>
        </>
    );
}

function VegeterianKitchenCard({
    badgeText,
    badgeIcon,
    title,
    description,
    bookmarksCount,
    likesCount,
    personsCount,
}: {
    badgeText: string;
    badgeIcon: string;
    title: string;
    description: string;
    bookmarksCount?: number;
    likesCount?: number;
    personsCount?: number;
}) {
    return (
        <>
            <Card p='12px' borderRadius='8px' border='1px solid rgba(0, 0, 0, 0.08)'>
                <CardHeader p={0} mb='8px'>
                    <Text isTruncated textOverflow='ellipsis' fontSize='16px' fontWeight={500}>
                        {title}
                    </Text>
                </CardHeader>
                <CardBody p={0} mb='24px'>
                    <Text noOfLines={3} fontSize='14px' lineHeight='20px'>
                        {description}
                    </Text>
                </CardBody>
                <CardFooter p={0}>
                    <Badge
                        borderRadius='4px'
                        bgColor=' #FFFFD3'
                        display='inline-flex'
                        alignItems='center'
                    >
                        <Image src={badgeIcon} />
                        <Text
                            color='black'
                            fontSize='10pt'
                            fontWeight='400'
                            textTransform='initial'
                        >
                            {badgeText}
                        </Text>
                    </Badge>
                    <Spacer />
                    <HStack p={0}>
                        {typeof bookmarksCount === 'number' ? (
                            <MenuItemButton
                                src='./src/assets/icons/bookmark.svg'
                                count={bookmarksCount}
                            />
                        ) : (
                            <></>
                        )}
                        {typeof likesCount === 'number' ? (
                            <MenuItemButton src='./src/assets/icons/like.svg' count={likesCount} />
                        ) : (
                            <></>
                        )}
                        {typeof personsCount === 'number' ? (
                            <MenuItemButton
                                src='./src/assets/icons/persons.svg'
                                count={personsCount}
                            />
                        ) : (
                            <></>
                        )}
                    </HStack>
                </CardFooter>
            </Card>
        </>
    );
}

function VegeterianKitchenCompactCard({ icon, title }: { icon: string; title: string }) {
    return (
        <>
            <Card>
                <CardBody px='12px' py='10px'>
                    <HStack justify='space-between' alignItems='center'>
                        <Image src={icon} boxSize='24px' />
                        <Text
                            fontSize={['16px', null, null, null, '20px']}
                            fontWeight={500}
                            isTruncated
                            textOverflow='ellipsis'
                            flex={1}
                        >
                            {title}
                        </Text>
                        <Button
                            minWidth='60px'
                            variant='outline'
                            color='#2DB100'
                            borderColor='#2DB100'
                            fontWeight={600}
                            borderRadius='6px'
                            h='32px'
                            fontSize={['12px', null, null, null, '14px']}
                            p='8px'
                        >
                            Готовить
                        </Button>
                    </HStack>
                </CardBody>
            </Card>
        </>
    );
}

export {
    BlogCard,
    MostPopularCard,
    MostPopularCardCompact,
    NewRecepieCard,
    VegeterianKitchenCard,
    VegeterianKitchenCompactCard,
};
