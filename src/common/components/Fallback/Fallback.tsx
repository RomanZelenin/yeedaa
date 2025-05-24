import { Center, Image, ResponsiveValue } from '@chakra-ui/react';

import fillIcon from '~/assets/icons/BsFillImageFill.svg';

export const Fallback = ({
    width,
    height,
}: {
    width: ResponsiveValue<string & unknown>;
    height: ResponsiveValue<string & unknown>;
}) => (
    <Center w={width} h={height} bgColor='blackAlpha.200'>
        <Image src={fillIcon} />
    </Center>
);
