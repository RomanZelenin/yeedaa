import { Button, Flex, Stack } from '@chakra-ui/react';

import { WriteLineIcon } from '~/common/components/Icons/WriteLineIcon';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import { IngredientsEditor } from './IngredientsEditor';
import { RecipeCardEditor } from './RecipeCardEditor';
import { StepsEditor } from './StepsEditor';

export const CreateRecipePage = () => (
    <EmptyConatainer>
        <>
            <Flex
                direction={{ base: 'column' }}
                px={{ base: '16px', md: '20px', lg: '0px' }}
                rowGap={{ base: '24px' }}
            >
                <RecipeCardEditor
                    onChangeCookingTime={() => {}}
                    onChangeCountPersons={() => {}}
                    onChangeDescription={() => {}}
                    onChangeTitle={() => {}}
                />
                <Flex
                    w='100%'
                    px={{ md: '64px' }}
                    direction='column'
                    maxW='768px'
                    alignSelf='center'
                    rowGap={{ base: '24px' }}
                >
                    <IngredientsEditor
                        onChangeIngredients={(ingredients) => {
                            console.log(ingredients);
                        }}
                    />
                    <StepsEditor />
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        justifyContent='center'
                        gap={{ base: '20px' }}
                    >
                        <Button
                            variant='outline'
                            borderColor='blackAlpha.600'
                            leftIcon={<WriteLineIcon />}
                        >
                            Сохранить черновик
                        </Button>
                        <Button variant='solid' backgroundColor='black' color='white'>
                            Опубликовать рецепт
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
            {/* <SaveImageModal/> */}
            {/* <ExitConfirmationModal /> */}
        </>
    </EmptyConatainer>
);
