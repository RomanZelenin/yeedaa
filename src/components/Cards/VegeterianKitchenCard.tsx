import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    HStack,
    Image,
    Spacer,
    Text,
} from '@chakra-ui/react';

import { useResource } from '~/hooks/ResourceContext';

export const VegeterianKitchenCard = ({
    badgeText,
    title,
    description,
    bookmarksCount,
    likesCount,
    personsCount,
}: {
    badgeText: string;
    title: string;
    description: string;
    bookmarksCount?: number;
    likesCount?: number;
    personsCount?: number;
}) => {
    const counters = [
        { type: 'bookmarks', count: bookmarksCount, icon: '/src/assets/icons/bookmark.svg' },
        { type: 'likes', count: likesCount, icon: '/src/assets/icons/like.svg' },
        { type: 'persons', count: personsCount, icon: '/src/assets/icons/persons.svg' },
    ].filter((item) => typeof item.count === 'number') as {
        type: string;
        count: number;
        icon: string;
    }[];

    const { getString, getPicture } = useResource();

    return (
        <Card p='12px' borderRadius='8px' border='1px solid rgba(0, 0, 0, 0.08)' h='100%'>
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
                    bgColor=' lime.50'
                    display='inline-flex'
                    alignItems='center'
                >
                    <Image src={getPicture(badgeText)} />
                    <Text color='black' fontSize='10pt' fontWeight='400' textTransform='initial'>
                        {getString(badgeText)}
                    </Text>
                </Badge>
                <Spacer />
                {counters.length > 0 && (
                    <HStack p={0}>
                        {counters.map(({ type, count, icon }) => (
                            <MenuItemButton key={type} src={icon} count={count} />
                        ))}
                    </HStack>
                )}
            </CardFooter>
        </Card>
    );
};

export const VegeterianKitchenCompactCard = ({ icon, title }: { icon: string; title: string }) => (
    <Card>
        <CardBody px='12px' py='10px'>
            <HStack justify='space-between' alignItems='center'>
                <Image src={icon} boxSize='24px' />
                <Text
                    fontSize={{ base: '16px', xl: '20px' }}
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
                    color='lime.600'
                    borderColor='lime.600'
                    fontWeight={600}
                    borderRadius='6px'
                    h='32px'
                    fontSize={{ base: '12px', xl: '14px' }}
                    p='8px'
                >
                    Готовить
                </Button>
            </HStack>
        </CardBody>
    </Card>
);

const MenuItemButton = ({ src, count }: { src: string; count: number }) => (
    <Flex alignItems='center' columnGap={{ base: '6px', lg: '8px' }}>
        <Image src={src} boxSize={{ base: '12px', lg: '12px' }} />
        <Box
            as='span'
            fontSize={{ base: '12px', lg: '16px' }}
            lineHeight={{ base: '16px', lg: '24px' }}
            fontWeight='600'
            color='lime.600'
        >
            {count}
        </Box>
    </Flex>
);
