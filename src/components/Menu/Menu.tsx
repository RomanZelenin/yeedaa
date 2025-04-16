import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Flex,
    Image,
    Link as ChakraLink,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router';

import Footer from './Footer';

export default function Menu({
    menuItems,
}: {
    menuItems: {
        title: string;
        path?: string;
        icon: string;
        submenu?: { title: string; path?: string }[];
    }[];
}) {
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState(() =>
        menuItems.findIndex((it) => it.path === location.pathname),
    );
    const [selectedSubmenuIdx, setSelectedSubmenuIdx] = useState(-1);
    const navigate = useNavigate();

    return (
        <Flex
            direction='column'
            pos='fixed'
            paddingTop='24px'
            width='256px'
            bottom={0}
            top={{ base: '64px', md: '80px' }}
            boxShadow='0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2)'
        >
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
                                        onClick={() => {
                                            setSelectedItem(idx);
                                            setSelectedSubmenuIdx(
                                                selectedItem != idx ? -1 : selectedSubmenuIdx,
                                            );
                                            if (selectedItem != idx) navigate(menu.path ?? '/');
                                        }}
                                    >
                                        <Image src={menu.icon} boxSize='24px' />
                                        <Text flex='1' textAlign='left' fontSize='16px'>
                                            {menu.title}
                                        </Text>

                                        <Image
                                            src={
                                                !isExpanded
                                                    ? '/src/assets/icons/down.svg'
                                                    : '/src/assets/icons/up.svg'
                                            }
                                        />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    <UnorderedList styleType='none' m={0}>
                                        {menu.submenu?.map((subItem, idx) => (
                                            <ListItem mb='12px'>
                                                <ChakraLink
                                                    my='6px'
                                                    display='flex'
                                                    onClick={() => {
                                                        setSelectedSubmenuIdx(idx);
                                                    }}
                                                    as={RouterLink}
                                                    to={subItem?.path ?? `/`}
                                                    borderLeft={
                                                        selectedSubmenuIdx === idx
                                                            ? '8px solid '
                                                            : '1px solid '
                                                    }
                                                    borderLeftColor='lime.300'
                                                    marginLeft={
                                                        selectedSubmenuIdx === idx ? '-8px' : '-1px'
                                                    }
                                                >
                                                    <Text
                                                        ml='11px'
                                                        fontSize='16px'
                                                        lineHeight='24px'
                                                        fontWeight={
                                                            selectedSubmenuIdx === idx ? 700 : 400
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

            <Footer />
        </Flex>
    );
}
