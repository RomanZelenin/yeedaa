import { Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react';

import { useResource } from '../ResourceContext/ResourceContext';

export const CustomCheckboxGroup = ({
    title,
    selectedItems,
    items,
    onChange,
}: {
    title: string;
    selectedItems: string[];
    items: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const { getString } = useResource();
    return (
        <>
            <CheckboxGroup value={selectedItems}>
                <Stack direction='column' spacing='12px' width='100%'>
                    <Text textStyle='textMdLh6Medium'>{title}</Text>
                    {items.map((it) => (
                        <Checkbox
                            onChange={onChange}
                            value={it}
                            variant='lime'
                            size='md'
                            colorScheme='green'
                            data-test-id={`checkbox-${getString(it).toLocaleLowerCase()}`}
                        >
                            <Text textStyle='textSmLh5Normal'>{getString(it)}</Text>
                        </Checkbox>
                    ))}
                </Stack>
            </CheckboxGroup>
        </>
    );
};
