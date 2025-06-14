import { Button, Image, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import arrowRightIcon from '~/assets/icons/BsArrowRight.svg';
import { BlogCardWithSubscribe } from '~/common/components/Cards/BlogCardWithSubscribe';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { ApplicationRoute } from '~/router';

import { Blogger } from '../../Home/Sections/SectionCookingBlogs';

export const OtherBlogs = ({ blogs }: { blogs: Blogger[] }) => {
    const { getString } = useResource();
    return (
        <VStack spacing='12px' align='stretch'>
            <Stack flexDir='row'>
                <Text px={0} fontSize={{ base: '24px', lg: '48px' }} fontWeight='500' flex={1}>
                    {getString('other-blogs')}
                </Text>
                <Button
                    data-test-id='blogger-user-other-blogs-button'
                    alignSelf='center'
                    px={0}
                    as={Link}
                    to={ApplicationRoute.BLOGS}
                    fontSize='16px'
                    color='black'
                    variant='ghost'
                    rightIcon={<Image src={arrowRightIcon} />}
                >
                    {getString('all-authors')}
                </Button>
            </Stack>
            <SimpleGrid
                data-test-id='blogger-user-other-blogs-grid'
                columns={{ base: 1, md: 3 }}
                columnGap={{ base: '0px', md: '12px' }}
                rowGap='12px'
            >
                {blogs?.map((blogger, i) => <BlogCardWithSubscribe key={i} blogger={blogger} />)}
            </SimpleGrid>
        </VStack>
    );
};
