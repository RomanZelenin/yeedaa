import {
    Box,
    Center,
    Flex,
    GridItem,
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
import { JSX } from '@emotion/react/jsx-runtime';

function HeaderContainer({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <VStack spacing={0}>
            <Box
                color='black'
                textAlign='center'
                fontSize={['24px', null, null, '48px']}
                fontWeight='700'
                lineHeight='32px'
            >
                <Text>{title}</Text>
                <Text
                    display={typeof subtitle === 'string' ? 'box' : 'none'}
                    fontSize={['14px']}
                    fontWeight={500}
                    lineHeight='20px'
                    color='rgba(0, 0, 0, 0.48)'
                    marginTop={['16px', null, null, '20px']}
                >
                    {subtitle}
                </Text>
            </Box>
            <Flex
                columnGap='8px'
                width={['100%', null, null, '31em']}
                mt={['16px', null, null, '32px']}
                justify='center'
            >
                <Center
                    as='button'
                    boxSize={['32px', null, null, '48px']}
                    border=' 1px solid rgba(0, 0, 0, 0.48);'
                    borderRadius='6px'
                >
                    <Image
                        boxSize={['14px', null, null, '24px']}
                        src='./src/assets/icons/filter.svg'
                    />
                </Center>
                <InputGroup flex={[1, null, 0.7, 1]}>
                    <Input
                        borderRadius='4px'
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        fontSize={['14px', null, null, '18px']}
                        placeholder='Название или ингредиент...'
                        h='100%'
                    />
                    <InputRightElement boxSize={['32px', null, null, '48px']}>
                        <Image src='./src/assets/icons/search.svg' />
                    </InputRightElement>
                </InputGroup>
            </Flex>

            <HStack
                display={['none', null, null, 'flex']}
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

export default function ContentContainer({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: JSX.Element;
}) {
    return (
        <>
            <GridItem
                px={[null, null, '30px']}
                colSpan={[4, null, 8]}
                display={['block', null, null, null]}
                colStart={[1, null, 1, 2, 4]}
                colEnd={[null, null, 13, 12, 10]}
            >
                <HeaderContainer title={title} subtitle={subtitle} />
            </GridItem>

            <GridItem
                colSpan={[4, null, 13]}
                mt={['20px', null, null, '24px']}
                display={['block', null, null, null]}
                colStart={[1, null, 1]}
                colEnd={[null, null, 13]}
            >
                <VStack align='stretch' spacing={['32px']}>
                    {children}
                </VStack>
            </GridItem>
        </>
    );
}
