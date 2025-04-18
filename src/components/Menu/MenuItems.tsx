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

import { menuItems } from '~/app/ConfigApp';

export const MenuItems = () => {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState(() =>
        menuItems.findIndex((it) => it.path?.substring(1) === category),
    );
    const [selectedSubmenuIdx, setSelectedSubmenuIdx] = useState(0);

    useEffect(() => {
        setSelectedItem(menuItems.findIndex((it) => it.path?.substring(1) === category));
        setSelectedSubmenuIdx(
            selectedItem >= 0
                ? menuItems[selectedItem].submenu!.findIndex(
                      (it) => it.path?.substring(1) === subcategory,
                  )
                : 0,
        );
    }, [category, subcategory]);

    const handleMenuItemClick = ({ idx, path }: { idx: number; path: string }) => {
        setSelectedItem(idx);
        if (selectedItem != idx) {
            setSelectedSubmenuIdx(0);
            navigate(path);
        }
    };

    return (
        <Accordion
            index={selectedItem}
            flex={1}
            variant='custom'
            paddingStart='10px'
            paddingEnd='16px'
            overflowY='auto'
            mb='12px'
            sx={{
                '&::-webkit-scrollbar': {
                    width: '8px',
                    borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#cecece',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: 'darkgray',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f5f5f5',
                },
            }}
        >
            {menuItems.map((menu, idx) => (
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
                                        menu.title === 'Веганская кухня' ? 'vegan-cuisine' : ''
                                    }
                                    onClick={() =>
                                        handleMenuItemClick({
                                            idx: idx,
                                            path: menu.path! + menu.submenu![0].path,
                                        })
                                    }
                                >
                                    <Image
                                        src={menu.icon}
                                        boxSize='24px'
                                        alt={`${menu.title} icon`}
                                    />
                                    <Text flex='1' textAlign='left' fontSize='16px'>
                                        {menu.title}
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
                                    {menu.submenu?.map((subItem, subIdx) => (
                                        <ListItem key={`${subItem.title}-${subIdx}`} mb='12px'>
                                            <ChakraLink
                                                my='6px'
                                                display='flex'
                                                onClick={() => setSelectedSubmenuIdx(subIdx)}
                                                as={RouterLink}
                                                to={`${menu.path}${subItem?.path}`}
                                                borderLeft={
                                                    selectedSubmenuIdx === subIdx
                                                        ? '8px solid '
                                                        : '1px solid '
                                                }
                                                borderLeftColor='lime.300'
                                                marginLeft={
                                                    selectedSubmenuIdx === subIdx ? '-8px' : '-1px'
                                                }
                                                _hover={{ textDecoration: 'none' }}
                                            >
                                                <Text
                                                    ml='11px'
                                                    fontSize='16px'
                                                    lineHeight='24px'
                                                    fontWeight={
                                                        selectedSubmenuIdx === subIdx ? 700 : 400
                                                    }
                                                >
                                                    {subItem.title}
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
