import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/react';

import { NavigationBreadcrumb } from '../Breadcrumbs/NavigationBreadcrumb';
import { Footer } from '../Footer/Footer';
import { MenuItems } from './MenuItems';

export interface DrawerComponentProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HamburgerMenu = ({ isOpen, onClose }: DrawerComponentProps) => (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
            data-test-id='nav'
            maxH={{ base: 'calc(100% - 84px - 64px)', md: 'calc(100% - 96px - 80px)' }}
            mt={{ base: '64px', md: '80px' }}
        >
            <DrawerHeader fontSize='16px' fontWeight={400} lineHeight='24px'>
                <NavigationBreadcrumb />
            </DrawerHeader>

            <DrawerBody>
                <MenuItems />
            </DrawerBody>

            <DrawerFooter>
                <Footer />
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
);
