import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    HStack,
    Stack,
    Text,
} from '@chakra-ui/react';

import { Blogger } from '~/app/pages/Home/Sections/SectionCookingBlogs';

import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { SubscribeIcon } from '../Icons/SubscribeIcon';
import { IconWithCounter } from './IconWithCounter';

export const BlogCard = ({ blogger }: { blogger: Blogger }) => (
    <Card p='16px' rowGap='16px' borderRadius='8px'>
        <CardHeader p={0}>
            <Flex alignItems='center' columnGap={{ base: '8px', md: '12px' }}>
                <Avatar
                    size={{ base: 'base', md: 'md' }}
                    name={`${blogger?.firstName} ${blogger?.lastName}`}
                    src=''
                    boxSize={{ base: '32px', lg: '48px' }}
                />
                <Box minW={0}>
                    <Text textStyle='profileNameBlogCard' isTruncated textOverflow='ellipsis'>
                        {`${blogger?.firstName} ${blogger?.lastName}`}
                    </Text>
                    <Text textStyle='profileNicknameBlogCard' noOfLines={1}>
                        @{blogger?.login}
                    </Text>
                </Box>
            </Flex>
        </CardHeader>
        <CardBody p={0}>
            <Text textStyle='commentBlogCard' noOfLines={3}>
                {blogger.notes.at(0)?.text ?? ''}
            </Text>
        </CardBody>
    </Card>
);

export const BlogCardWithRecipes = ({ blogger }: { blogger: Blogger }) => (
    <Card p='16px' rowGap='16px' borderRadius='8px'>
        <CardHeader p={0}>
            <Flex alignItems='center' columnGap={{ base: '8px', md: '12px' }}>
                <Avatar
                    size={{ base: 'base', md: 'md' }}
                    name={`${blogger?.firstName} ${blogger?.lastName}`}
                    src=''
                    boxSize={{ base: '32px', lg: '48px' }}
                />
                <Box minW={0}>
                    <Text textStyle='profileNameBlogCard' isTruncated textOverflow='ellipsis'>
                        {`${blogger?.firstName} ${blogger?.lastName}`}
                    </Text>
                    <Text textStyle='profileNicknameBlogCard' noOfLines={1}>
                        @{blogger?.login}
                    </Text>
                </Box>
            </Flex>
        </CardHeader>
        <CardBody p={0}>
            <Text textStyle='commentBlogCard' noOfLines={3}>
                {blogger.notes.at(0)?.text ?? ''}
            </Text>
        </CardBody>
    </Card>
);

export const BlogCardWithSubscribe = ({ blogger }: { blogger: Blogger }) => (
    <Card p='16px' rowGap='16px' borderRadius='8px'>
        <CardHeader p={0}>
            <Flex alignItems='center' columnGap={{ base: '8px', md: '12px' }}>
                <Avatar
                    size={{ base: 'base', md: 'md' }}
                    name={`${blogger?.firstName} ${blogger?.lastName}`}
                    src=''
                    boxSize={{ base: '32px', lg: '48px' }}
                />
                <Box minW={0}>
                    <Text textStyle='profileNameBlogCard' isTruncated textOverflow='ellipsis'>
                        {`${blogger?.firstName} ${blogger?.lastName}`}
                    </Text>
                    <Text textStyle='profileNicknameBlogCard' noOfLines={1}>
                        @{blogger?.login}
                    </Text>
                </Box>
            </Flex>
        </CardHeader>
        <CardBody p={0} display='flex' flexDirection='column'>
            <Text textStyle='commentBlogCard' noOfLines={3} mb='16px' flex={1}>
                {blogger.notes.at(0)?.text ?? ''}
            </Text>
            <Stack direction='row' justify='space-between'>
                <HStack>
                    <Button
                        h='24px'
                        leftIcon={<SubscribeIcon boxSize='12px' />}
                        variant='solid'
                        bgColor='black'
                        color='white'
                    >
                        <Text textStyle='textXsLh4Semibold'>Подписаться</Text>
                    </Button>
                    <Button h='24px' variant='outline' borderColor='lime.600'>
                        <Text textStyle='textXsLh4Semibold' color='lime.600'>
                            Читать
                        </Text>
                    </Button>
                </HStack>
                <HStack>
                    <IconWithCounter
                        icon={<BookmarkIcon boxSize='12px' />}
                        count={blogger.bookmarksCount}
                    />
                    <IconWithCounter
                        icon={<PersonsIcon fill='black' boxSize='12px' />}
                        count={blogger.subscribersCount}
                    />
                </HStack>
            </Stack>
        </CardBody>
    </Card>
);
