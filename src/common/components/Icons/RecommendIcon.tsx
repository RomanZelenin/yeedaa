import { Icon, IconProps } from '@chakra-ui/icons';
import { JSX, SVGProps } from 'react';

export const RecommendIcon = (
    props: JSX.IntrinsicAttributes &
        Omit<SVGProps<SVGSVGElement>, 'as' | 'translate' | keyof IconProps> & {
            htmlTranslate?: 'yes' | 'no' | undefined;
        } & IconProps & { as?: 'svg' | undefined },
) => (
    <Icon viewBox='0 0 16 16' fill='none' {...props}>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M15.98 8.17L15.01 14.12C14.84 15.5 13.13 16 12 16H5.69C5.49 16 5.31 15.95 5.16 15.86L3.72 15H2C0.94 15 0 14.06 0 13V9C0 7.94 0.94 6.98 2 7H4C4.91 7 5.39 6.55 6.39 5.45C7.3 4.45 7.27 3.65 7.02 2.18C6.94 1.68 7.08 1.18 7.44 0.76C7.83 0.29 8.42 0 9 0C10.83 0 12 3.71 12 5.01L11.98 5.99H14.02C15.18 5.99 15.97 6.79 16 7.96C16 8.07 15.98 8.17 15.98 8.17ZM14.01 6.98H12.02C11.32 6.98 10.99 6.7 10.99 6.01L11.02 4.98C11.02 3.71 9.85 0.98 9.02 0.98C8.52 0.98 7.94 1.48 8.02 1.98C8.27 3.56 8.36 4.76 7.13 6.12C6.11 7.25 5.36 8 4 8V14L5.67 15H12C12.73 15 13.95 14.69 14 14L14.02 13.98L15.02 7.98C14.99 7.34 14.64 6.98 14.02 6.98H14.01Z'
            fill={props.fill?.toString() ?? 'black'}
        />
    </Icon>
);
