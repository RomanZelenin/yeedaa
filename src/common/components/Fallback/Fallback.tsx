import { Center, CenterProps, Image } from '@chakra-ui/react';

import fillIcon from '~/assets/icons/BsFillImageFill.svg';

export const Fallback = (props: CenterProps) => (
    <Center
        width={props.width}
        height={props.height}
        bgColor='blackAlpha.200'
        borderRadius={props.borderRadius}
    >
        <Image src={fillIcon} />
    </Center>
);
