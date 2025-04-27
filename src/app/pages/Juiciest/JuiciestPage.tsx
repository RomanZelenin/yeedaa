import { Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/components/ResourceContext/ResourceContext';
import { recipesSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';

export default function JuiciestPage() {
    const recipes = [...useAppSelector(recipesSelector)].sort((a, b) => b.likes - a.likes);
    const { getString } = useResource();

    return (
        <ContentContainer title={getString('juiciest')}>
            <VStack spacing='32px'>
                <VStack spacing='12px'>
                    <RecipeCollection recipes={recipes} />
                    <Button
                        display='inline-flex'
                        as={Link}
                        to='/the-juiciest#'
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
                </VStack>
            </VStack>
        </ContentContainer>
    );
}
