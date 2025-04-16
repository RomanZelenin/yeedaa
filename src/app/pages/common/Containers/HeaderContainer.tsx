import {
    Box,
    Center,
    Flex,
    HStack,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react';

export default function HeaderContainer({ title, subtitle }: { title: string; subtitle?: string }) {
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
                <Center
                    as='button'
                    boxSize={{ base: '32px', lg: '48px' }}
                    border=' 1px solid rgba(0, 0, 0, 0.48);'
                    borderRadius='6px'
                >
                    <Image
                        boxSize={{ base: '14px', lg: '24px' }}
                        src='/src/assets/icons/filter.svg'
                    />
                </Center>
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

            <HStack
                display={{ base: 'none', lg: 'flex' }}
                alignContent='center'
                spacing={0}
                mt='16px'
                w='31em'
            >
                <Text fontSize='16px' fontWeight='500' flex={1}>
                    Исключить мои аллергены
                </Text>
                <Switch ml='12px' />
                <Select
                    flex={1}
                    ml='16px'
                    variant='outline'
                    placeholder='Выберите из списка...'
                ></Select>
            </HStack>
        </VStack>
    );
}
