import { Button, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useGetJuiciestRecipesQuery } from '~/query/create-recipe-api';
import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';

export default function JuiciestPage() {
    const dispatch = useAppDispatch();
    const { getString } = useResource();
    const [page, setPage] = useState(1);
    const { data, isSuccess, isLoading, isError } = useGetJuiciestRecipesQuery({
        limit: 8,
        page: page,
    });
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoadingNextPage, setNextLoading] = useState(false);
    const nextPage = () => {
        setNextLoading(true);
        setPage(page + 1);
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAppLoader(false));
            setRecipes([...recipes, ...data.data]);
            setNextLoading(false);
        }
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
        if (isError) {
            dispatch(setAppLoader(false));
        }
    }, [data, isSuccess, isLoading, isError]);

    if (isError) {
        return null;
    }

    if (isSuccess) {
        return (
            <ContentContainer title={getString('juiciest')}>
                <VStack spacing='32px'>
                    <VStack spacing='12px'>
                        <RecipeCollection
                            recipes={recipes.map((recipe) => ({
                                ...recipe,
                                path: `/the-juiciest/${recipe._id}`,
                            }))}
                        />
                        {page < data!.meta.totalPages && (
                            <Button
                                data-test-id='load-more-button'
                                textAlign='center'
                                display='inline-flex'
                                onClick={() => nextPage()}
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
                    </VStack>
                </VStack>
            </ContentContainer>
        );
    }
}
