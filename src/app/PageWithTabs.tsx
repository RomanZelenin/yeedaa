import { HStack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';

import ContentContainer from './PageContentContainer';

export default function PageWithTabs({
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
        return (
            <Tabs isLazy isFitted defaultIndex={2}>
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
        );
    }

    return <DataTabs data={tabData} />;
}
