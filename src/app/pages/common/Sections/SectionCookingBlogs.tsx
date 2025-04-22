import { Box, Button, HStack, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { fetchBlogs } from '~/app/mocks/api';
import { BlogCard } from '~/components/Cards/BlogCard';
import { Profile } from '~/components/Header/ProfileInfo';

export default function SectionCookingBlogs() {
    const [blogs, setBlogs] = useState<{ person: Profile; comment: string }[]>([]);

    useEffect(() => {
        fetchBlogs().then((blogs) => {
            setBlogs(blogs);
        });
    }, []);

    return (
        <VStack
            bgColor='lime.300'
            borderRadius='16px'
            p='12px'
            spacing='12px'
            align='stretch'
            mx={{ base: '16px', lg: '0px' }}
        >
            <HStack>
                <Text
                    alignSelf='start'
                    fontSize={{ base: '24px', lg: '30px', xl: '36px' }}
                    fontWeight='500'
                    lineHeight='32px'
                    flex={1}
                >
                    Кулинарные блоги
                </Text>
                <Button
                    display={{ base: 'none', lg: 'inline-flex' }}
                    fontSize='16px'
                    color='black'
                    variant='ghost'
                    px='16px'
                    py='8px'
                    rightIcon={<Image src='/src/assets/icons/BsArrowRight.svg' />}
                >
                    Все авторы
                </Button>
            </HStack>
            <VStack>
                <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    columnGap={{ base: '0px', md: '12px' }}
                    rowGap='12px'
                >
                    {blogs.map((it, idx) => (
                        <Box key={idx}>
                            <BlogCard person={it.person} comment={it.comment} />
                        </Box>
                    ))}
                </SimpleGrid>
                <Button
                    display={{ base: 'inline-flex', lg: 'none' }}
                    fontSize='16px'
                    color='black'
                    variant='ghost'
                    flex={1}
                    px='16px'
                    py='8px'
                    rightIcon={<Image src='/src/assets/icons/BsArrowRight.svg' boxSize='16px' />}
                >
                    Все авторы
                </Button>
            </VStack>
        </VStack>
    );
}
