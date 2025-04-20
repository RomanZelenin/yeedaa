import {
    Box,
    Flex,
    HStack,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Switch,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { FilterDrawer } from '~/components/Drawer/FilterDrawer';
import { FilterIcon } from '~/components/Icons/FilterIcon';
import { AllergySelect } from '~/components/Select /AllergySelect';

export default function HeaderContainer({ title, subtitle }: { title: string; subtitle?: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isExcludeAllergens, setIsExcludeAllergens] = useState(false);

    return (
        <VStack spacing={0}>
            <Box>
                <Text textStyle='headerContainerTitle'>{title}</Text>
                <Text
                    display={typeof subtitle === 'string' ? 'box' : 'none'}
                    textStyle='headerContainerSubtitle'
                    marginTop={{ base: '16px', lg: '20px' }}
                >
                    {subtitle}
                </Text>
            </Box>
            <Flex
                columnGap='8px'
                width={{ base: '100%', lg: '31em' }}
                mt={{ base: '16px', lg: '32px' }}
                justify='center'
            >
                <IconButton
                    minW={0}
                    borderRadius='6px'
                    boxSize={{ base: '32px', lg: '48px' }}
                    border=' 1px solid rgba(0, 0, 0, 0.48)'
                    icon={<FilterIcon boxSize={{ base: '14px', lg: '24px' }} />}
                    aria-label='Filter'
                    bgColor='transparent'
                    onClick={onOpen}
                />

                <InputGroup flex={{ base: 1, md: 0.7, lg: 1 }}>
                    <Input
                        borderRadius='4px'
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        textStyle='searchInput'
                        placeholder='Название или ингредиент...'
                        h='100%'
                    />
                    <InputRightElement boxSize={{ base: '32px', lg: '48px' }}>
                        <Image src='/src/assets/icons/search.svg' />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <HStack display={{ base: 'none', lg: 'flex' }} spacing='16px' mt='16px' w='31em'>
                <HStack flex={1} spacing='12px' alignSelf='start'>
                    <Text fontSize='16px' fontWeight='500' flex={1} whiteSpace='nowrap'>
                        Исключить мои аллергены
                    </Text>
                    <Switch
                        isChecked={isExcludeAllergens}
                        onChange={() => setIsExcludeAllergens(!isExcludeAllergens)}
                    />
                    <AllergySelect isEnabled={isExcludeAllergens} />
                </HStack>
            </HStack>
            <FilterDrawer isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
}
