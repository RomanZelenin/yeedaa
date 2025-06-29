import { Button, Hide, HStack, Show, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import {
    DraftFoodCardCompactWithEdit,
    DraftFoodCardWithEdit,
} from '~/common/components/Cards/DraftFoodCardWithEdit';
import {
    ProfileFoodCardCompactWithEdit,
    ProfileFoodCardWithEdit,
} from '~/common/components/Cards/ProfileFoodCardWithEdit';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

export const ListDraftsAndRecipes = ({
    recipes,
    drafts,
}: {
    recipes: Recipe[];
    drafts: Recipe[];
}) => {
    const { getString } = useResource();
    const [isLoadingNextPage, setNextLoading] = useState(false);
    const isShowDraftsTitle = drafts.length > 0;
    const allRecipes = useMemo(
        () =>
            drafts
                .map((draft, i) => (
                    <DraftFoodCardWithEdit key={draft._id} id={`${i}`} recipe={draft} />
                ))
                .concat(
                    recipes.map((recipe, i) => (
                        <ProfileFoodCardWithEdit
                            key={recipe._id}
                            id={`${i + drafts.length}`}
                            recipe={recipe}
                        />
                    )),
                ),
        [drafts, recipes],
    );
    const allRecipesCompact = useMemo(
        () =>
            drafts
                .map((draft, i) => (
                    <DraftFoodCardCompactWithEdit key={draft._id} id={`${i}`} recipe={draft} />
                ))
                .concat(
                    recipes.map((recipe, i) => (
                        <ProfileFoodCardCompactWithEdit
                            key={recipe._id}
                            id={`${i + drafts.length}`}
                            recipe={recipe}
                        />
                    )),
                ),
        [drafts, recipes],
    );
    const [page, setPage] = useState(1);
    const nextPage = () => {
        setNextLoading(true);
        setPage(page + 1);
        setNextLoading(false);
    };
    const isShowLoadMore = page * 8 < allRecipes.length;

    return (
        <Stack data-test-id='user-profile-recipes'>
            <HStack mt='24px'>
                <Text textStyle={{ base: 'textLgLh7Bold', lg: 'textXlLh7Bold' }}>
                    Мои рецепты{' '}
                    <Text
                        as='span'
                        display='inline-block'
                        textStyle='textLgLh7Normal'
                        color='blackAlpha.600'
                    >
                        ({recipes.length})
                    </Text>
                </Text>
                {isShowDraftsTitle && (
                    <Text textStyle={{ base: 'textLgLh7Bold', lg: 'textXlLh7Bold' }}>
                        Черновики{' '}
                        <Text
                            as='span'
                            display='inline-block'
                            textStyle='textLgLh7Normal'
                            color='blackAlpha.600'
                        >
                            ({drafts.length})
                        </Text>
                    </Text>
                )}
            </HStack>
            <Show above='lg'>
                <VStack align='stretch'>
                    <SimpleGrid
                        data-test-id=''
                        columns={{ base: 1, xl: 2 }}
                        columnGap={{ xl: '24px' }}
                        rowGap={{ lg: '16px', xl: '24px' }}
                    >
                        {allRecipes.slice(0, page * 8)}
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
                        {allRecipesCompact.slice(0, page * 8)}
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
    );
};
