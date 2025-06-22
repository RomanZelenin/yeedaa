import { Center, CenterProps, Image } from '@chakra-ui/react';

import fillIcon from '~/assets/icons/BsFillImageFill.svg';

export const Fallback = ({ ...props }: CenterProps) => (
    <Center {...props} bgColor='blackAlpha.200'>
        <Image src={fillIcon} />
    </Center>
);
