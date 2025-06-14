import { Text, VStack } from '@chakra-ui/react';

import { CookingStep } from '~/app/mocks/types/type_defenitions';
import { StepPreparationCard } from '~/common/components/Cards/StepPreparationCard';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

export const CookingSteps = ({ steps }: { steps: CookingStep[] }) => {
    const { getString } = useResource();

    return (
        <VStack spacing={{ base: '20px' }} align='stretch'>
            <Text alignSelf='start' textStyle={{ base: 'text2xlLh8Medium' }}>
                {getString('cooking-steps')}
            </Text>
            {steps.map((it, idx) => (
                <StepPreparationCard
                    key={idx}
                    step={it.stepNumber}
                    description={it.description}
                    cover={it.image}
                    isLast={idx === steps.length - 1}
                />
            ))}
        </VStack>
    );
};
