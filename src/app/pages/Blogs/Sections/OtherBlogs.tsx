import { Button, Image, SimpleGrid, Stack, VStack } from '@chakra-ui/react';

import arrowRightIcon from '~/assets/icons/BsArrowRight.svg';
import { BlogCardWithSubscribe } from '~/common/components/Cards/BlogCardWithSubscribe';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

import { Blogger } from '../../Home/Sections/SectionCookingBlogs';

export const OtherBlogs = ({
    bloggers,
    limit,
    onClick,
}: {
    bloggers: Blogger[];
    limit?: string;
    onClick: () => void;
}) => {
    const { getString } = useResource();
    return (
        <VStack
            data-test-id='blogs-others-box'
            bgColor='blackAlpha.50'
            borderRadius='16px'
            p={{ base: '12px', lg: '24px' }}
            spacing='12px'
            align='stretch'
            mx={{ base: '16px', lg: '0px' }}
        >
            <Stack>
                <SimpleGrid
                    data-test-id='blogs-others-grid'
                    columns={{ base: 1, md: 2, xl: 3 }}
                    columnGap={{ base: '0px', md: '12px' }}
                    rowGap='12px'
                >
                    {bloggers?.map((it, i) => <BlogCardWithSubscribe key={i} blogger={it} />)}
                </SimpleGrid>
                <Button
                    data-test-id='blogs-others-button'
                    alignSelf='center'
                    onClick={onClick}
                    fontSize='16px'
                    color='black'
                    variant='ghost'
                    px='16px'
                    mt={{ base: '12px', lg: '24px' }}
                    leftIcon={
                        limit === 'all' ? (
                            <Image transform='rotate(180deg)' src={arrowRightIcon} />
                        ) : undefined
                    }
                    rightIcon={limit !== 'all' ? <Image src={arrowRightIcon} /> : undefined}
                >
                    {limit === 'all' ? getString('collapse') : getString('all-authors')}
                </Button>
            </Stack>
        </VStack>
    );
};
