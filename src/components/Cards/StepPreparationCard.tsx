import { Card, CardBody, CardHeader, Image, Stack, Tag, TagLabel, Text } from '@chakra-ui/react';

export const StepPreparationCard = ({
    description,
    step,
    cover,
    isLast,
}: {
    description: string;
    step: number;
    cover?: string;
    isLast: boolean;
}) => (
    <Card direction='row' overflow='clip' flex={1}>
        {cover ? (
            <Image
                src={cover}
                w={{ base: '158px', lg: '346px' }}
                h={{ base: '128px', lg: '244px' }}
            />
        ) : (
            <></>
        )}
        <Stack spacing={{ base: '12px', lg: '16px' }} flex={1} p={{ base: '8px', lg: '24px' }}>
            <CardHeader p='0px'>
                <Tag layerStyle={isLast ? 'categoryTag' : 'timerTag'}>
                    <TagLabel textStyle='textSmLh5'>Шаг {step}</TagLabel>
                </Tag>
            </CardHeader>
            <CardBody p={0}>
                <Text textStyle='textSmLh5'>{description}</Text>
            </CardBody>
        </Stack>
    </Card>
);
