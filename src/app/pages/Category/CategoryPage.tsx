import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';

import { menuItems } from '../../ConfigApp';
import { fetchRecepies } from '../../mocks/api';
import { Recipe } from '../../mocks/types/type_defenitions';
import ContentContainer from '../common/Containers/ContentContainer';
import SectionRandomCategory from '../common/Sections/SectionRandomCategory';

export default function CategoryPage() {
    const [recipes, setRecepies] = useState<Recipe[]>([]);
    const { category, subcategory } = useParams();
    const navigate = useNavigate();

    const [tabIndex, setTabIndex] = useState(0);

    const [titleCategory, setTitleCategory] = useState('');
    const [subtitleCategory, setSubtitleCategory] = useState('');

    useEffect(() => {
        fetchRecepies().then((recipes) => {
            const recepiesFromCurrentCategory = recipes.filter((recepie) =>
                recepie.category.includes(category!),
            );
            setRecepies(recepiesFromCurrentCategory);
        });

        const currCategory = menuItems.find((it) => it.path?.substring(1) === category)!;

        setTitleCategory(currCategory.title);
        setSubtitleCategory(currCategory.subtitle ?? '');
    }, [category]);

    useEffect(() => {
        setTabIndex(
            menuItems
                .find((it) => it.path?.substring(1) === category)!
                .subcategory!.findIndex((it) => it.path!.substring(1) === subcategory),
        );
    }, [subcategory]);

    return (
        <>
            <ContentContainer title={titleCategory} subtitle={subtitleCategory}>
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
                                ?.subcategory?.map((it) => <Tab color='lime.800'>{it.title}</Tab>)}
                        </TabList>

                        <TabPanels mt='12px'>
                            {menuItems
                                .find((it) => it.path?.substring(1) === category)
                                ?.subcategory?.map((it) => (
                                    <TabPanel p={0}>
                                        <VStack spacing='12px' px='0px'>
                                            <Box px='0px' textAlign='start'>
                                                <RecipeCollection
                                                    recipes={recipes.filter(
                                                        (recipe) =>
                                                            it.path &&
                                                            recipe.subcategory.includes(
                                                                it.path.slice(1),
                                                            ),
                                                    )}
                                                />
                                            </Box>
                                            <Button
                                                display={['inline-flex']}
                                                as='a'
                                                href='#'
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
                                    </TabPanel>
                                ))}
                        </TabPanels>
                    </Tabs>
                    <SectionRandomCategory />
                </>
            </ContentContainer>
        </>
    );
}
