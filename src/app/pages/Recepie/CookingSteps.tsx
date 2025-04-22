import { Text, VStack } from '@chakra-ui/react';

import { CookingStep } from '~/app/mocks/types/type_defenitions';
import { StepPreparationCard } from '~/components/Cards/StepPreparationCard';

export const CookingSteps = ({ steps }: { steps: CookingStep[] }) => (
    <>
        <VStack spacing={{ base: '20px' }} align='stretch'>
            <Text alignSelf='start' textStyle={{ base: 'text2xlLh8Medium' }}>
                Шаги приготовления
            </Text>
            {steps.map((it, idx) => (
                <StepPreparationCard
                    step={it.stepNumber}
                    description={it.description}
                    cover={it.image}
                    isLast={idx === steps.length - 1}
                />
            ))}
        </VStack>
    </>
);
