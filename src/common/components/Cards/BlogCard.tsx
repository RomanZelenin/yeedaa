import { Avatar, Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';

import { Blogger } from '~/app/pages/Home/Sections/SectionCookingBlogs';

export const BlogCard = ({ blogger }: { blogger: Blogger }) => (
    <Card data-test-id='blogs-card' p='16px' rowGap='16px' borderRadius='8px'>
        <CardHeader p={0}>
            <Flex alignItems='center' columnGap={{ base: '8px', md: '12px' }}>
                <Avatar
                    size={{ base: 'base', md: 'md' }}
                    name={`${blogger?.firstName} ${blogger?.lastName}`}
                    src=''
                    boxSize={{ base: '32px', lg: '48px' }}
                />
                <Box minW={0}>
                    <Text
                        data-test-id='blogs-card-name'
                        textStyle='profileNameBlogCard'
                        isTruncated
                        textOverflow='ellipsis'
                    >
                        {`${blogger?.firstName} ${blogger?.lastName}`}
                    </Text>
                    <Text
                        data-test-id='blogs-card-login'
                        textStyle='profileNicknameBlogCard'
                        noOfLines={1}
                    >
                        @{blogger?.login}
                    </Text>
                </Box>
            </Flex>
        </CardHeader>
        <CardBody p={0}>
            <Text data-test-id='blogs-card-notes-text' textStyle='commentBlogCard' noOfLines={3}>
                {blogger.notes.at(0)?.text ?? ''}
            </Text>
        </CardBody>
    </Card>
);
