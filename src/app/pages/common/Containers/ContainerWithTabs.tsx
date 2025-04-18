import { HStack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

import { menuItems } from '~/app/ConfigApp';

import { ErrorView } from '../../ErrorView';
import ContentContainer from './ContentContainer';

export default function ContainerWithTabs({
    title,
    subtitle,
    tabData,
}: {
    title: string;
    subtitle?: string;
    tabData: { label: string; content?: JSX.Element }[];
}) {
    return (
        <ContentContainer title={title} subtitle={subtitle}>
            <TabsWithContent tabData={tabData} />
        </ContentContainer>
    );
}

function TabsWithContent({ tabData }: { tabData: { label: string; content?: JSX.Element }[] }) {
    function DataTabs({ data }) {
        const { category, subcategory } = useParams();
        const navigate = useNavigate();

        const { selectedCategory, idxSelectedSubcategory } = useMemo(() => {
            const selectedCategory = menuItems.find((it) => it.path?.substring(1) === category)!;
            const idxSelectedSubcategory = selectedCategory.submenu?.findIndex(
                (it) => it.path?.substring(1) === subcategory,
            );
            return { selectedCategory, idxSelectedSubcategory };
        }, [category, subcategory]);

        return (
            <>
                {idxSelectedSubcategory === -1 ? (
                    <ErrorView />
                ) : (
                    <Tabs
                        isLazy
                        isFitted
                        defaultIndex={idxSelectedSubcategory}
                        onChange={(idx) => {
                            navigate(
                                `${selectedCategory.path}${selectedCategory.submenu![idx].path}`,
                            );
                        }}
                    >
                        <TabList flex={1} justifyContent='center' borderBottom='0'>
                            <HStack
                                display='inline-flex'
                                overflowX='scroll'
                                borderBottom='2px solid lightgray'
                                css={{ scrollbarWidth: 'none' }}
                            >
                                {data.map((tab, index) => (
                                    <Tab
                                        py='4px'
                                        fontSize={['14px', null, null, '16px']}
                                        lineHeight={['20px', null, null, '24px']}
                                        key={index}
                                    >
                                        {tab.label}
                                    </Tab>
                                ))}
                            </HStack>
                        </TabList>
                        <TabPanels mt='12px'>
                            {data.map((tab, index) => (
                                <TabPanel key={index} p={0}>
                                    <VStack spacing={['32px']}>{tab.content}</VStack>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                )}
            </>
        );
    }

    return <DataTabs data={tabData} />;
}
