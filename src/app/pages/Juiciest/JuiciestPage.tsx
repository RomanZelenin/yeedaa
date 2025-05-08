import { Button, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useGetJuiciestRecipesQuery } from '~/query/create-api';

import ContentContainer from '../common/Containers/ContentContainer';

export default function JuiciestPage() {
    const { getString } = useResource();
    const [page, setPage] = useState(1);
    const { data, isSuccess, isLoading } = useGetJuiciestRecipesQuery({ limit: 8, page: page });
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [testLoading, setTestLoading] = useState(false); //Для прохождения теста
    useEffect(() => {
        if (data?.data) {
            setRecipes([...recipes, ...data.data]);
            if (page > 1) {
                setTestLoading(true);
                setTimeout(() => {
                    setTestLoading(false);
                }, 500);
            }
        }
    }, [data]);

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

                    {isLoading || (isSuccess && page < data!.meta.totalPages) ? (
                        <Button
                            data-test-id='load-more-button'
                            textAlign='center'
                            display='inline-flex'
                            onClick={() => {
                                setPage(page + 1);
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
                            {testLoading ? getString('load') : getString('load-more')}
                        </Button>
                    ) : (
                        <></>
                    )}
                </VStack>
            </VStack>
        </ContentContainer>
    );
}
