import { Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react';

export const FilterTag = ({ label, onClose }: CustomTagProps) => (
    <Tag
        data-test-id='filter-tag'
        size='md'
        borderRadius='6px'
        variant='subtle'
        bgColor='lime.100'
        fontWeight='medium'
        borderWidth='1px'
        borderColor='lime.400'
    >
        <TagLabel borderColor='red'>
            <Text color='lime.700'>{label}</Text>
        </TagLabel>
        <TagCloseButton color='lime.700' onClick={onClose} />
    </Tag>
);

interface CustomTagProps {
    label: string;
    onClose: () => void;
    bgColor?: string;
    textColor?: string;
    size?: 'sm' | 'md' | 'lg';
    borderRadius?: string;
}
