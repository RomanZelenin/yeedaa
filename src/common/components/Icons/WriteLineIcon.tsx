import { Icon, IconProps } from '@chakra-ui/icons';
import { JSX, SVGProps } from 'react';

export const WriteLineIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 17 16' fill='none' {...props}>
        <path
            d='M13.198 4.93392C13.45 4.68192 13.5886 4.34725 13.5886 3.99125C13.5886 3.63525 13.45 3.30059 13.198 3.04859L12.1406 1.99125C11.8886 1.73925 11.554 1.60059 11.198 1.60059C10.842 1.60059 10.5073 1.73925 10.256 1.99059L3.16797 9.05659V11.9999H6.10997L13.198 4.93392ZM11.198 2.93392L12.256 3.99059L11.196 5.04659L10.1386 3.98992L11.198 2.93392ZM4.5013 10.6666V9.60992L9.19463 4.93125L10.252 5.98859L5.5593 10.6666H4.5013ZM3.16797 13.3333H13.8346V14.6666H3.16797V13.3333Z'
            fill='black'
        />
    </Icon>
);
