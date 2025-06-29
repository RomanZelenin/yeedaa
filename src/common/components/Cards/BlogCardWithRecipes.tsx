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
    Tag,
    TagLabel,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import { Blogger } from '~/app/pages/Home/Sections/SectionCookingBlogs';
import { ApplicationRoute } from '~/router';

import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { IconWithCounter } from './IconWithCounter';

export const BlogCardWithRecipes = ({ blogger }: { blogger: Blogger }) => (
    <Card p='16px' rowGap='16px' borderRadius='8px'>
        <CardHeader p={0}>
            <Flex alignItems='center' columnGap={{ base: '8px', md: '12px' }}>
                <Avatar
                    size={{ base: 'base', md: 'md' }}
                    name={`${blogger?.firstName} ${blogger?.lastName}`}
                    src={blogger.photoLink}
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
            {blogger.newRecipesCount > 0 && (
                <Tag
                    data-test-id='blogs-card-new-recipes-badge'
                    position='absolute'
                    right='8px'
                    top='8px'
                    layerStyle='timerTag'
                >
                    <TagLabel textStyle='textSmLh5'>
                        {blogger.newRecipesCount}{' '}
                        {blogger.newRecipesCount === 1
                            ? 'новый рецепт'
                            : blogger.newRecipesCount >= 2 && blogger.newRecipesCount <= 4
                              ? 'новых рецепта'
                              : 'новых рецептов'}
                    </TagLabel>
                </Tag>
            )}
        </CardHeader>
        <CardBody p={0} display='flex' flexDirection='column'>
            <Text textStyle='commentBlogCard' mb='16px' noOfLines={3} flex={1}>
                {blogger.notes.at(0)?.text ?? ''}
            </Text>
            <Stack direction='row' justify='space-between'>
                <HStack>
                    <Button
                        as={Link}
                        to={`${ApplicationRoute.BLOGS}/${blogger._id}`}
                        data-test-id='blogs-card-recipes-button'
                        onClick={() => {}}
                        h='24px'
                        variant='solid'
                        bgColor='lime.400'
                        color='black'
                    >
                        <Text textStyle='textSmLh5Semibold'>Рецепты</Text>
                    </Button>
                    <Button
                        as={Link}
                        to={`${ApplicationRoute.BLOGS}/${blogger._id}#notes`}
                        data-test-id='blogs-card-notes-button'
                        h='24px'
                        variant='outline'
                        borderColor='lime.600'
                    >
                        <Text textStyle='textSmLh5Semibold' color='lime.600'>
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
