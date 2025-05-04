import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Image,
    Link as ChakraLink,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router';

import { useGetCategoriesQuery } from '~/query/create-api';

export const MenuItems = () => {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();

    const { data: categories, isLoading, isError } = useGetCategoriesQuery();
    const [selectedItem, setSelectedItem] = useState(-1);
    const [selectedSubmenuIdx, setSelectedSubmenuIdx] = useState(0);

    useEffect(() => {
        setSelectedItem(
            categories
                ?.filter((it) => it.subCategories)
                .findIndex((it) => it.category === category) ?? -1,
        );
        setSelectedSubmenuIdx(
            categories
                ?.find((it) => it.category === category)
                ?.subCategories?.findIndex((it) => it.category == subcategory) ?? 0,
        );
    }, [categories, subcategory]);

    const handleMenuItemClick = ({ idx, path }: { idx: number; path: string }) => {
        setSelectedItem(idx);
        if (selectedItem != idx) {
            setSelectedSubmenuIdx(0);
            navigate(path);
        }
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    if (isError) {
        return <Text>Error</Text>;
    }

    return (
        <Accordion
            index={selectedItem}
            flex={1}
            variant='custom'
            paddingStart='10px'
            paddingEnd='16px'
            overflowY='auto'
            mb='12px'
        >
            {categories
                ?.filter((it) => it.subCategories)
                .map((category, idx) => (
                    <AccordionItem key={idx} style={{ borderWidth: 0 }}>
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton
                                        px='8px'
                                        py='12px'
                                        gap='8px'
                                        _expanded={{
                                            bg: 'lime.100',
                                            fontWeight: 700,
                                            lineHeight: '24px',
                                        }}
                                        data-test-id={
                                            category.title === 'Веганская кухня'
                                                ? 'vegan-cuisine'
                                                : `${category.title}`
                                        }
                                        onClick={() =>
                                            handleMenuItemClick({
                                                idx: idx,
                                                path:
                                                    category.category +
                                                    '/' +
                                                    category.subCategories?.[0].category,
                                            })
                                        }
                                    >
                                        <Image
                                            src={category.icon}
                                            boxSize='24px'
                                            alt={`${category.title} icon`}
                                        />
                                        <Text flex='1' textAlign='left' fontSize='16px'>
                                            {category.title}
                                        </Text>

                                        <Image
                                            src={
                                                isExpanded
                                                    ? '/src/assets/icons/up.svg'
                                                    : '/src/assets/icons/down.svg'
                                            }
                                            alt={isExpanded ? 'Collapse' : 'Expand'}
                                        />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    <UnorderedList styleType='none' m={0}>
                                        {category.subCategories?.map((subCategory, i) => (
                                            <ListItem
                                                key={`${subCategory.title}-${i}`}
                                                mb='12px'
                                                aria-selected={
                                                    selectedSubmenuIdx === i ? true : false
                                                }
                                                data-test-id={
                                                    selectedSubmenuIdx === i
                                                        ? `${subCategory.category}-active`
                                                        : ''
                                                }
                                            >
                                                <ChakraLink
                                                    my='6px'
                                                    display='flex'
                                                    onClick={() => setSelectedSubmenuIdx(i)}
                                                    as={RouterLink}
                                                    to={`${category.category}/${category.subCategories?.[i].category}`}
                                                    borderLeft={
                                                        selectedSubmenuIdx === i
                                                            ? '8px solid '
                                                            : '1px solid '
                                                    }
                                                    borderLeftColor='lime.300'
                                                    marginLeft={
                                                        selectedSubmenuIdx === i ? '-8px' : '-1px'
                                                    }
                                                    _hover={{ textDecoration: 'none' }}
                                                >
                                                    <Text
                                                        ml='11px'
                                                        fontSize='16px'
                                                        lineHeight='24px'
                                                        fontWeight={
                                                            selectedSubmenuIdx === i ? 700 : 400
                                                        }
                                                    >
                                                        {subCategory.title}
                                                    </Text>
                                                </ChakraLink>
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                ))}
        </Accordion>
    );
};
