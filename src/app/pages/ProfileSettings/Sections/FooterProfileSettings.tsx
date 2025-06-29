import { HStack, Image, Link, Stack, Text, useDisclosure } from '@chakra-ui/react';

import rightIcon from '~/assets/icons/BsArrowRight.svg';

import { DeleteAccountModal } from '../Modal/DeleteAccountModal';

export const FooterProfileSettings = () => {
    const {
        isOpen: isOpenDeleteAccountModal,
        onClose: onCloseDeleteAccountModal,
        onOpen: onOpenDeleteAccountModal,
    } = useDisclosure({ defaultIsOpen: false });

    return (
        <>
            <Stack>
                <Text textStyle='textLgLh7Bold'>О проекте</Text>
                <HStack>
                    <Text textStyle='textMdLh6Medium'>
                        Связаться с{' '}
                        <Link href='https://clevertec.ru/' textDecoration='underline'>
                            разработчиками
                        </Link>
                    </Text>
                    <Image src={rightIcon} />
                </HStack>
            </Stack>
            <Stack>
                <Text textStyle='textLgLh7Bold'>Удаление аккаунта</Text>
                <Link onClick={onOpenDeleteAccountModal}>
                    <HStack>
                        <Text textStyle='textMdLh6Medium'>Удалить мой аккаунт</Text>
                        <Image src={rightIcon} />
                    </HStack>
                </Link>
            </Stack>
            <DeleteAccountModal
                isOpen={isOpenDeleteAccountModal}
                onClose={onCloseDeleteAccountModal}
            />
        </>
    );
};
