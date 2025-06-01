import { Center, CenterProps, Image } from '@chakra-ui/react';

import fillIcon from '~/assets/icons/BsFillImageFill.svg';

export const Fallback = (props: CenterProps) => (
    <Center
        data-test-id={props[`data-test-id`]}
        onClick={props.onClick}
        width={props.width}
        height={props.height}
        bgColor='blackAlpha.200'
        borderRadius={props.borderRadius}
        borderColor={props.borderColor}
        border={props.border}
    >
        <Image src={fillIcon} />
    </Center>
);
