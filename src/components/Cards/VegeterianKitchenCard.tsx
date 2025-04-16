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

function MenuItemButton({ src, count }: { src: string; count: number }) {
    return (
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
                    <Image src={badgeIcon} />
                    <Text color='black' fontSize='10pt' fontWeight='400' textTransform='initial'>
                        {badgeText}
                    </Text>
                </Badge>
                <Spacer />
                <HStack p={0}>
                    {typeof bookmarksCount === 'number' ? (
                        <MenuItemButton
                            src='/src/assets/icons/bookmark.svg'
                            count={bookmarksCount}
                        />
                    ) : (
                        <></>
                    )}
                    {typeof likesCount === 'number' ? (
                        <MenuItemButton src='/src/assets/icons/like.svg' count={likesCount} />
                    ) : (
                        <></>
                    )}
                    {typeof personsCount === 'number' ? (
                        <MenuItemButton src='/src/assets/icons/persons.svg' count={personsCount} />
                    ) : (
                        <></>
                    )}
                </HStack>
            </CardFooter>
        </Card>
    );
}

function VegeterianKitchenCompactCard({ icon, title }: { icon: string; title: string }) {
    return (
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
}

export { VegeterianKitchenCard, VegeterianKitchenCompactCard };
