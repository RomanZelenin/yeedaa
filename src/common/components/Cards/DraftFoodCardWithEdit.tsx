import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Highlight,
    HStack,
    Image,
    Stack,
    Tag,
    TagLabel,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { useGetFilteredCategoriesBySubcatigoriesId } from '~/common/hooks/useGetFilteredCategoriesBySubcatigoriesId';
import { querySelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { Fallback } from '../Fallback/Fallback';
import { useResource } from '../ResourceContext/ResourceContext';

export const DraftFoodCardWithEdit = ({ id, recipe }: { id?: string; recipe: Recipe }) => {
    const { getString } = useResource();
    const query = useAppSelector(querySelector);
    const { categories } = useGetFilteredCategoriesBySubcatigoriesId(recipe.categoriesIds);

    return (
        <Card
            key={id}
            data-test-id={`food-card-${id}`}
            direction='row'
            overflow='clip'
            minH='244px'
        >
            <Image
                objectFit='cover'
                src={recipe.image}
                w='346px'
                fallback={<Fallback width='346px' height='100%' />}
            />
            <Stack spacing='4px' px='4px' flex={1}>
                <CardHeader>
                    <HStack spacing='50px' justify='space-between' alignItems='start'>
                        <Wrap>
                            {categories?.map((category, i) => (
                                <WrapItem key={i}>
                                    <Tag layerStyle='categoryTag' bgColor=' lime.50'>
                                        <Image src={category.icon} boxSize='16px' alt='' />
                                        <TagLabel textStyle='textSmLh5'>{category.title}</TagLabel>
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                        <HStack spacing='0px'>
                            <Tag layerStyle='timerTag'>
                                <TagLabel textStyle='textSmLh5'>{getString('draft')}</TagLabel>
                            </Tag>
                        </HStack>
                    </HStack>
                </CardHeader>
                <CardBody py={0}>
                    <Text textStyle='textXlLh7Medium' mb='8px' noOfLines={1}>
                        <Highlight query={query ?? ''} styles={{ color: 'lime.600' }}>
                            {recipe.title}
                        </Highlight>
                    </Text>
                    <Text textStyle='textSmLh5Normal' noOfLines={3}>
                        {recipe.description}
                    </Text>
                </CardBody>
                <CardFooter flex={1} justifyContent='right' alignItems='end' columnGap='8px'>
                    <Button
                        as={Link}
                        to={recipe.path}
                        data-test-id='profile-edit-button'
                        bgColor='blackAlpha.900'
                        color='white'
                        textStyle='textSmLh5Semibold'
                        alignItems='center'
                        px='12px'
                        py='6px'
                        h='32px'
                        borderRadius='6px'
                        borderColor='blackAlpha.200'
                        borderWidth='1px'
                    >
                        {getString('edit')}
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export const DraftFoodCardCompactWithEdit = ({ id, recipe }: { id?: string; recipe: Recipe }) => {
    const { getString } = useResource();
    const query = useAppSelector(querySelector);
    const { categories } = useGetFilteredCategoriesBySubcatigoriesId(recipe.categoriesIds);

    return (
        <Card
            key={id}
            data-test-id={`food-card-${id}`}
            direction='row'
            overflow='clip'
            minH='128px'
        >
            <Image
                src={recipe.image}
                w='158px'
                fallback={<Fallback width='158px' height='100%' />}
            />
            <Wrap pos='absolute' top='6px' left='6px' alignItems='center' maxW='158px'>
                {categories?.map((category, i) => (
                    <WrapItem key={i}>
                        <Tag layerStyle='categoryTag' bgColor=' lime.50'>
                            <Image src={category.icon} boxSize='16px' alt='' />
                            <TagLabel textStyle='textSmLh5'>{category.title}</TagLabel>
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>

            <Stack spacing={0} flex={1} px='8px' pt='8px' pb='4px'>
                <CardHeader p={0}>
                    <HStack spacing='0px' justify='end'>
                        <Tag layerStyle='timerTag'>
                            <TagLabel textStyle='textSmLh5'>{getString('draft')}</TagLabel>
                        </Tag>
                    </HStack>
                </CardHeader>
                <CardBody p={0}>
                    <Text textStyle='textMdLh6Medium' noOfLines={2}>
                        <Highlight query={query ?? ''} styles={{ color: 'lime.600' }}>
                            {recipe.title ?? ''}
                        </Highlight>
                    </Text>
                </CardBody>
                <CardFooter p={0} justifyContent='right' columnGap='12px' alignItems='center'>
                    <Button
                        as={Link}
                        to={recipe.path}
                        data-test-id='profile-edit-button'
                        bgColor='black'
                        color='white'
                        fontSize='12px'
                        lineHeight='16px'
                        alignItems='center'
                        px='8px'
                        fontWeight={600}
                        h='1.5rem'
                        borderRadius='6px'
                    >
                        {getString('edit')}
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};
