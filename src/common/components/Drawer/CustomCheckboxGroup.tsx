import { Checkbox, Stack, Text } from '@chakra-ui/react';

import { SelectItem } from '~/app/features/filters/filtersSlice';

import { useResource } from '../ResourceContext/ResourceContext';

export const CustomCheckboxGroup = ({
    title,
    items,
    onChange,
}: {
    title: string;
    items: SelectItem[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const { getString } = useResource();

    return (
        <>
            <Stack direction='column' spacing='12px' width='100%'>
                <Text textStyle='textMdLh6Medium'>{title}</Text>
                {items.map((it) => (
                    <Checkbox
                        isChecked={it.selected}
                        onChange={onChange}
                        value={it.title}
                        variant='lime'
                        size='md'
                        colorScheme='green'
                        data-test-id={`checkbox-${getString(it.title).toLocaleLowerCase()}`}
                    >
                        <Text textStyle='textSmLh5Normal'>{getString(it.title)}</Text>
                    </Checkbox>
                ))}
            </Stack>
        </>
    );
};
