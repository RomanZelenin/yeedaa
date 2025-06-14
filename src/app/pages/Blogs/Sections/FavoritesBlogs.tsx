import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { BlogCardWithRecipes } from '~/common/components/Cards/BlogCardWithRecipes';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

import { Blogger } from '../../Home/Sections/SectionCookingBlogs';

export const FavoritesBlogs = ({ bloggers }: { bloggers: Blogger[] }) => {
    const { getString } = useResource();
    return (
        <VStack
            data-test-id='blogs-favorites-box'
            bgColor='lime.300'
            borderRadius='16px'
            p={{ base: '12px', lg: '24px' }}
            spacing='12px'
            align='stretch'
            mx={{ base: '16px', lg: '0px' }}
        >
            <HStack>
                <Text
                    alignSelf='start'
                    textStyle={{
                        base: 'text2xlLh8Medium',
                        lg: 'text4xlLh10Normal',
                    }}
                    flex={1}
                >
                    {getString('featured-blogs')}
                </Text>
            </HStack>
            <VStack>
                <SimpleGrid
                    width='100%'
                    data-test-id='blogs-favorites-grid'
                    columns={{ base: 1, md: 2 }}
                    columnGap={{ base: '0px', md: '12px' }}
                    rowGap='12px'
                >
                    {bloggers?.map((it, i) => <BlogCardWithRecipes key={i} blogger={it} />)}
                </SimpleGrid>
            </VStack>
        </VStack>
    );
};
