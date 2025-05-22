import { ResponsiveValue } from '@chakra-ui/react';

export type BottomBehavior =
    | ResponsiveValue<
          | number
          | string
          | '-moz-initial'
          | 'inherit'
          | 'initial'
          | 'revert'
          | 'revert-layer'
          | 'unset'
          | 'auto'
      >
    | undefined;
