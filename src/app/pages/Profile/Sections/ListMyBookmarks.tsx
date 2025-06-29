import { Button, Hide, Show, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import {
    ProfileFoodCardCompactWithDeleteBookmark,
    ProfileFoodCardWithDeleteBookmark,
} from '~/common/components/Cards/ProfileFoodCardWithDeleteBookmark';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

export const ListMyBookmarks = ({ recipes }: { recipes: Recipe[] }) => {
    const [myBookmarks, setMyBookmarks] = useState(recipes);
    const { getString } = useResource();
    const [isLoadingNextPage, setNextLoading] = useState(false);
    const [page, setPage] = useState(1);
    const nextPage = () => {
        setNextLoading(true);
        setPage(page + 1);
        setNextLoading(false);
    };
    const isShowLoadMore = page * 8 < myBookmarks.length;

    return (
        <Stack data-test-id='user-profile-bookmarks'>
            <Stack mt='24px'>
                <Text textStyle={{ base: 'textLgLh7Bold', lg: 'textXlLh7Bold' }}>
                    Мои закладки{' '}
                    <Text
                        as='span'
                        display='inline-block'
                        textStyle='textLgLh7Normal'
                        color='blackAlpha.600'
                    >
                        ({myBookmarks.length})
                    </Text>
                </Text>
                <Show above='lg'>
                    <VStack align='stretch'>
                        <SimpleGrid
                            data-test-id=''
                            columns={{ base: 1, xl: 2 }}
                            columnGap={{ xl: '24px' }}
                            rowGap={{ lg: '16px', xl: '24px' }}
                        >
                            {myBookmarks.slice(0, page * 8).map((recipe, i) => (
                                <ProfileFoodCardWithDeleteBookmark
                                    key={recipe._id}
                                    id={`${i}`}
                                    recipe={recipe}
                                    onSuccessDeleteBookmark={() => {
                                        setMyBookmarks(
                                            myBookmarks.filter((it) => it._id !== recipe._id),
                                        );
                                    }}
                                />
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Show>
                <Hide above='lg'>
                    <VStack alignItems='stretch'>
                        <SimpleGrid
                            data-test-id=''
                            columns={{ base: 1, md: 2 }}
                            columnGap={{ base: '0px', md: '12px' }}
                            rowGap='12px'
                        >
                            {myBookmarks.slice(0, page * 8).map((recipe, i) => (
                                <ProfileFoodCardCompactWithDeleteBookmark
                                    key={recipe._id}
                                    id={`${i}`}
                                    recipe={recipe}
                                />
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Hide>
                {isShowLoadMore && (
                    <Button
                        data-test-id='load-more-button'
                        textAlign='center'
                        display='inline-flex'
                        onClick={() => {
                            nextPage();
                        }}
                        bgColor='lime.300'
                        alignSelf='center'
                        fontSize='16px'
                        color='black'
                        variant='ghost'
                        flex={1}
                        px='16px'
                        py='8px'
                    >
                        {isLoadingNextPage ? getString('load') : getString('load-more')}
                    </Button>
                )}
            </Stack>
        </Stack>
    );
};
