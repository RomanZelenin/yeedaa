import { Flex, Text } from '@chakra-ui/react';

import { NutritionValue } from '~/app/mocks/types/type_defenitions';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

export const NutritionFacts = ({ nutrition }: { nutrition: NutritionValue }) => {
    const { getString } = useResource();
    return (
        <>
            <Text textStyle='textSmLh5Normal'>
                <Text as='sup'>*</Text>
                {getString('calories-per-serving')}
            </Text>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                rowGap={{ base: '12px' }}
                columnGap={{ base: '12px', xl: '24px' }}
                justify={{ md: 'space-between' }}
            >
                {Object.entries(nutrition)
                    .map((it) => {
                        switch (it[0]) {
                            case 'calories':
                                return {
                                    title: getString('calories'),
                                    value: it[1],
                                    unit: getString('kcal'),
                                };
                            case 'proteins':
                                return {
                                    title: getString('proteins'),
                                    value: it[1],
                                    unit: getString('gram'),
                                };
                            case 'fats':
                                return {
                                    title: getString('fats'),
                                    value: it[1],
                                    unit: getString('gram'),
                                };
                            case 'carbohydrates':
                                return {
                                    title: getString('carbohydrates'),
                                    value: it[1],
                                    unit: getString('gram'),
                                };
                        }
                    })
                    .map((it) => (
                        <Flex
                            flex={1}
                            direction={{ base: 'column', md: 'row' }}
                            py='16px'
                            px='12px'
                            border='1px solid'
                            borderColor='blackAlpha.200'
                            borderRadius='16px'
                        >
                            <Flex
                                flex={1}
                                direction={{ base: 'row', md: 'column' }}
                                justify={{ base: 'space-between' }}
                                align={{ base: 'center' }}
                                rowGap={{ base: '12px' }}
                            >
                                <Text
                                    flex={2}
                                    textStyle={{ base: 'textSmLh5Normal' }}
                                    color='blackAlpha.600'
                                    textTransform='lowercase'
                                >
                                    {it!.title}
                                </Text>
                                <Text
                                    flex={2}
                                    textStyle={{
                                        base: 'text2xlLh8Medium',
                                        md: 'text4xlLh10Medium',
                                    }}
                                    align='center'
                                    color='lime.800'
                                >
                                    {it!.value}
                                </Text>
                                <Text
                                    flex={1}
                                    textStyle={{
                                        base: 'textXsLh4Semibold',
                                        md: 'textSmLh5Semibold',
                                    }}
                                    align='start'
                                    color='blackAlpha.900'
                                    textTransform='uppercase'
                                >
                                    {it!.unit}
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
            </Flex>
        </>
    );
};
