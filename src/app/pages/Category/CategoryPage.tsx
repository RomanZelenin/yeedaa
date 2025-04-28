import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import menuItems from '~/app/mocks/menu_items.json';
import { filterRecipesByAllergens } from '~/app/Utils/filterRecipesByAllergens';
import { filterRecipesByTitleOrIngridient } from '~/app/Utils/filterRecipesByTitle';
import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/components/ResourceContext/ResourceContext';
import { allergensSelector, querySelector, recipesSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';

export default function CategoryPage() {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const { getString } = useResource();
    const recipes = useAppSelector(recipesSelector);
    const [tabIndex, setTabIndex] = useState(0);
    const query = useAppSelector(querySelector);
    const allergens = useAppSelector(allergensSelector).filter((item) => item.selected === true);

    useEffect(() => {
        setTabIndex(
            menuItems
                .find((it) => it.path?.substring(1) === category)!
                .subcategory!.findIndex((it) => it.path!.substring(1) === subcategory),
        );
    }, [subcategory]);

    if (!subcategory) {
        const path = menuItems.find((it) => it.path?.substring(1) === category)!.subcategory[0]!
            .path!;
        return <Navigate to={`/${category}${path}`} replace />;
    }

    let recepiesFromCategory = recipes.filter((recepie) => recepie.category.includes(category!));

    if (query.length > 0) {
        recepiesFromCategory = filterRecipesByTitleOrIngridient(recepiesFromCategory, query);
    }
    if (allergens.length > 0) {
        recepiesFromCategory = filterRecipesByAllergens(
            recepiesFromCategory,
            allergens.map((it) => it.title),
        );
    }

    recepiesFromCategory = recepiesFromCategory.filter((recepie) =>
        recepie.subcategory.includes(subcategory!),
    );

    let subtitle = '';
    if (category === 'vegan') {
        subtitle =
            'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.';
    }

    return (
        <>
            <ContentContainer title={getString(category!)} subtitle={subtitle}>
                <>
                    <Tabs
                        align='center'
                        isLazy
                        index={tabIndex}
                        onChange={(idx) => {
                            const s = menuItems.find((it) => it.path!.substring(1) === category)!
                                .subcategory![idx];
                            navigate(`/${category}${s?.path}`);
                        }}
                    >
                        <TabList
                            overflowX={{ base: 'scroll', lg: 'unset' }}
                            flexWrap={{ base: 'wrap' }}
                        >
                            {menuItems
                                .find((it) => it.path?.substring(1) === category)
                                ?.subcategory?.map((it, i) => (
                                    <Tab
                                        key={i}
                                        color='lime.800'
                                        data-test-id={`tab-${it.path?.substring(1)}-${i}`}
                                    >
                                        {it.title}
                                    </Tab>
                                ))}
                        </TabList>

                        <TabPanels mt='12px'>
                            {menuItems
                                .find((it) => it.path?.substring(1) === category)
                                ?.subcategory?.map((it, i) => (
                                    <TabPanel key={i} p={0}>
                                        <VStack spacing='12px' px='0px'>
                                            <Box px='0px' textAlign='start'>
                                                <RecipeCollection
                                                    recipes={recepiesFromCategory.filter(
                                                        (recipe) =>
                                                            it.path &&
                                                            recipe.subcategory.includes(
                                                                it.path.slice(1),
                                                            ),
                                                    )}
                                                />
                                            </Box>
                                        </VStack>
                                    </TabPanel>
                                ))}
                        </TabPanels>
                    </Tabs>
                </>
            </ContentContainer>
        </>
    );
}
