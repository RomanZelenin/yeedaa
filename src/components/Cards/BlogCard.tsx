import { Avatar, Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';

import { Profile } from '../Header/ProfileInfo';

export const BlogCard = ({ person, comment }: { person: Profile; comment: string }) => (
    <Card p='16px' rowGap='16px' borderRadius='8px'>
        <CardHeader p={0}>
            <Flex alignItems='center' columnGap={{ base: '8px', md: '12px' }}>
                <Avatar src={person.avatar} boxSize={{ base: '32px', lg: '48px' }} />
                <Box minW={0}>
                    <Text textStyle='profileNameBlogCard' isTruncated textOverflow='ellipsis'>
                        {`${person.firstName} ${person.lastName}`}
                    </Text>
                    <Text textStyle='profileNicknameBlogCard' noOfLines={1}>
                        {person.nickname}
                    </Text>
                </Box>
            </Flex>
        </CardHeader>
        <CardBody p={0}>
            <Text textStyle='commentBlogCard' noOfLines={3}>
                {comment}
            </Text>
        </CardBody>
    </Card>
);
