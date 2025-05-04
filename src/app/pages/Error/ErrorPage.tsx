import { Center, GridItem, Image, Link, Text, VStack } from '@chakra-ui/react';

import { useResource } from '~/common/components/ResourceContext/ResourceContext';

export const ErrorPage = () => {
    const { getString } = useResource();
    return (
        <GridItem colSpan={{ base: 4, md: 13 }} display='block' colStart={1} colEnd={{ lg: 13 }}>
            <Center
                height={{
                    base: 'calc(100vh - 180px)',
                    md: 'calc(100vh - 208px)',
                    lg: 'calc(100vh - 144px)',
                }}
            >
                <VStack spacing={{ base: '32px' }}>
                    <Image
                        src='/src/assets/images/page-not-found.png'
                        boxSize={{ base: '108px', lg: '206px' }}
                    />
                    <VStack
                        spacing={{ base: '16px' }}
                        width={{ base: '252px', lg: '332px' }}
                        textAlign='center'
                    >
                        <Text textStyle='text2xlLh8Bold'>{getString('no-such-page')}</Text>
                        <Text as='span' textStyle='textMdLh6Normal' color='blackAlpha.700'>
                            {getString('you-can-look-another-recipe')}{' '}
                            <Link href='/' textDecoration='underline'>
                                {getString('here').toLocaleLowerCase()}
                            </Link>
                        </Text>
                    </VStack>
                </VStack>
            </Center>
        </GridItem>
    );
};
