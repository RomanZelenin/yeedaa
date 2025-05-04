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
    const { data, isSuccess } = useGetJuiciestRecipesQuery({ limit: 8, page: page });
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (data?.data) setRecipes([...recipes, ...data.data]);
    }, [data]);

    /*  const query = useAppSelector(querySelector);
     const allergens = useAppSelector(allergensSelector).filter((item) => item.selected === true);
     if (query.length > 0) {
         recipes = filterRecipesByTitleOrIngridient(recipes, query);
     }
     if (allergens.length > 0) {
         recipes = filterRecipesByAllergens(
             recipes,
             allergens.map((it) => it.title),
         );
     } */
    if (isSuccess)
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
                        {page < data!.meta.totalPages ? (
                            <Button
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
                                {getString('load-more')}
                            </Button>
                        ) : (
                            <></>
                        )}
                    </VStack>
                </VStack>
            </ContentContainer>
        );
}
