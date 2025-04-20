import { Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { MostPopularContent } from '../../MostPopular';

export default function SectionMostPopular() {
    const mostPopularCards = [
        {
            avatar: '/src/assets/images/kate-avatar.png',
            bookmarksCount: 85,
            likesCount: 152,
            title: 'Кнелли со спагетти',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            subcategory: 'Вторые блюда',
            coverBig: '/src/assets/images/spagetti-big.png',
            coverMini: '/src/assets/images/spagetti.png',
            badgeIcon: '/src/assets/icons/pan.svg',
        },
        {
            avatar: '/src/assets/images/kate-avatar.png',
            recommendation: 'Елена Высоцкая рекомендует',
            bookmarksCount: 1,
            likesCount: 2,
            title: 'Пряная ветчина по итальянски',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            subcategory: 'Вторые блюда',
            coverBig: '/src/assets/images/italian_ham.png',
            coverMini: '/src/assets/images/italian_ham_mini.png',
            badgeIcon: '/src/assets/icons/pan.svg',
        },
        {
            avatar: '/src/assets/images/kate-avatar.png',
            recommendation: 'Alex Cook рекомендует',
            bookmarksCount: 258,
            likesCount: 342,
            title: 'Лапша с курицей и шафраном',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            subcategory: 'Вторые блюда',
            coverBig: '/src/assets/images/chiken_pasta.png',
            coverMini: '/src/assets/images/chiken_pasta_mini.png',
            badgeIcon: '/src/assets/icons/pan.svg',
        },
        {
            avatar: '/src/assets/images/kate-avatar.png',
            bookmarksCount: 124,
            likesCount: 324,
            title: 'Том-ям с капустой кимчи',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            subcategory: 'Национальные',
            coverBig: '/src/assets/images/tom-yam-kimchi.png',
            coverMini: '/src/assets/images/tom-yam-kimchi-mini.png',
            badgeIcon: '/src/assets/icons/international-food-96 1.svg',
        },
    ];

    return (
        <VStack spacing='12px' align='stretch'>
            <HStack>
                <Text
                    px={{ base: '16px', lg: '0px' }}
                    fontSize={{ base: '24px', lg: '48px' }}
                    fontWeight='500'
                    flex={1}
                >
                    Самое сочное
                </Text>
                <Button
                    as={Link}
                    to='/most_popular'
                    display={{ base: 'none', lg: 'inline-flex' }}
                    bgColor='lime.300'
                    fontSize='16px'
                    color='black'
                    variant='ghost'
                    px='16px'
                    py='8px'
                    rightIcon={<Image src='/src/assets/icons/BsArrowRight.svg' />}
                    data-test-id='juiciest-link'
                >
                    Вся подборка
                </Button>
            </HStack>
            <MostPopularContent cards={mostPopularCards} />
            <Button
                display={{ base: 'flex', lg: 'none' }}
                as={Link}
                to='/most_popular'
                bgColor='lime.300'
                alignSelf='center'
                fontSize='16px'
                color='black'
                variant='ghost'
                flex={1}
                px='16px'
                py='8px'
                rightIcon={<Image src='/src/assets/icons/BsArrowRight.svg' />}
                data-test-id='juiciest-link-mobile'
            >
                Вся подборка
            </Button>
        </VStack>
    );
}
