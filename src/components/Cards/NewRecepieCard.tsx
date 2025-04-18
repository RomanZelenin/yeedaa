import { Badge, Box, Card, CardBody, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { ThreeButtons } from './ThreeButtons';

export const NewRecepieCard = ({
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
}) => (
    <Card
        minW={{ base: '158px', lg: '279px', xl: '322px' }}
        maxW={{ base: '158px', lg: '279px', xl: '322px' }}
        border='1px solid rgba(0, 0, 0, 0.08);'
        borderRadius='8px'
        overflow='clip'
        flex={1}
    >
        <CardBody p='0px' display='flex' flexDirection='column'>
            <Image src={cover} objectFit='cover' maxH='230px' maxW='322px' />
            <Badge
                borderRadius='4px'
                bgColor=' lime.150'
                display={{ base: 'inline-flex', lg: 'none' }}
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
                mx={{ base: '8px', lg: '12px', xl: '24px' }}
                my={{ base: '8px', lg: '12px', xl: '16px' }}
                spacing='8px'
                align='stretch'
                flex={1}
            >
                <Text
                    display={{ base: 'none', lg: 'block' }}
                    fontSize={{ base: '12pt', lg: '18px', xl: '20px' }}
                    fontWeight='500'
                    lineHeight='150%'
                    isTruncated
                    flex={1}
                >
                    {title}
                </Text>

                <Text
                    display={{ lg: 'none' }}
                    fontSize={{ base: '12pt', lg: '18px' }}
                    fontWeight='500'
                    lineHeight='150%'
                    noOfLines={2}
                    flex={1}
                >
                    {title}
                </Text>

                <Box display={{ base: 'none', lg: 'inline-block' }} mb='16px'>
                    <Text
                        fontSize={{ lg: '14px' }}
                        lineHeight='20px'
                        fontWeight='400'
                        noOfLines={3}
                    >
                        {description}
                    </Text>
                </Box>
                <Box display={{ base: 'flex', lg: 'none' }}>
                    <ThreeButtons
                        bookmarksCount={bookmarksCount}
                        likesCount={likesCount}
                        personsCount={personsCount}
                    />
                </Box>
                <HStack display={{ base: 'none', lg: 'flex' }} justify='space-between' flex={1}>
                    <Badge
                        borderRadius='4px'
                        bgColor=' lime.150'
                        display='inline-flex'
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
