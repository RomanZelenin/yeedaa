import { Icon, IconProps } from '@chakra-ui/icons';
import { JSX, SVGProps } from 'react';

export const BurgerIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 24 24' {...props}>
        <path d='M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z' fill='black' />
    </Icon>
);
