import { Badge, Box, Card, CardBody, HStack, Image, Text, VStack } from '@chakra-ui/react';

import ThreeButtons from './ThreeButtons';

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
                    bgColor=' lime.150'
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
                            bgColor=' lime.150'
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

export default NewRecepieCard;
