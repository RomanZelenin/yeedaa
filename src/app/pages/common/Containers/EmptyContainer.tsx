import { GridItem } from '@chakra-ui/react';
import { ReactElement } from 'react';

export const EmptyConatainer = ({ children }: { children: ReactElement }) => (
    <GridItem
        colSpan={{ base: 4, md: 8 }}
        display='block'
        colStart={{ base: 1, md: 1 }}
        colEnd={{ base: 5, md: 13 }}
    >
        {children}
    </GridItem>
);
