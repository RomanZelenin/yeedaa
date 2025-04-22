import { Button, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';

import { fetchJuicestRecepies } from '../../mocks/api';
import ContentContainer from '../common/Containers/ContentContainer';
import SectionRandomCategory from '../common/Sections/SectionRandomCategory';

export default function JuiciestPage() {
    const [recipes, setRecepies] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        fetchJuicestRecepies().then((recipes) => {
            setRecepies(recipes);
        });
    }, []);

    return (
        <ContentContainer title='Самое сочное'>
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
                        Загрузить ещё
                    </Button>
                </VStack>
                <SectionRandomCategory />
            </VStack>
        </ContentContainer>
    );
}
