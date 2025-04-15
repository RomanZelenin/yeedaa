import { Avatar, Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';

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

export default BlogCard;
