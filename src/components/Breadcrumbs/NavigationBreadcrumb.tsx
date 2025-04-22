import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Location, useLocation, useParams } from 'react-router';

import { menuItems } from '~/app/ConfigApp';

interface BreadcrumbItem {
    title: string;
    path: string;
}

interface MenuItem {
    title: string;
    path?: string;
    submenu?: MenuItem[];
}

export const NavigationBreadcrumb = () => {
    const breadcrumbItems = useBreadcrumbItems();

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
            separator='>'
            flex={1}
            fontStyle='breadcrumb'
            listProps={{ flexWrap: 'wrap' }}
        >
            {breadcrumbItems}
        </Breadcrumb>
    );
};

const useBreadcrumbItems = () => {
    const location = useLocation();
    const { category, subcategory, id } = useParams();
    /* const [menuItems] = useState<MenuItem[]>([]); */

    return useMemo(() => {
        const items = buildBreadcrumbItems(location, category, subcategory, id, menuItems);
        return renderBreadcrumbItems(items);
    }, [location, category, subcategory]);
};

const buildBreadcrumbItems = (
    location: Location,
    category?: string,
    subcategory?: string,
    id?: string,
    menuItems: MenuItem[] = [],
): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ title: 'Главная', path: '/' }];

    if (category && subcategory) {
        const selectedCategory = menuItems.find((it) => it.path?.substring(1) === category);

        const selectedSubcategory = selectedCategory!.subcategory!.find(
            (it) => it.path?.substring(1) === subcategory,
        );

        if (selectedCategory && selectedSubcategory) {
            items.push({
                title: selectedCategory.title,
                path: `/${category}${selectedCategory.subcategory?.[0]?.path || ''}`,
            });
            if (id) {
                items.push(
                    {
                        title: selectedSubcategory.title,
                        path: `/${category}/${subcategory}`,
                    },
                    {
                        title: id,
                        path: '#',
                    },
                );
            } else {
                items.push({
                    title: selectedSubcategory.title,
                    path: '#',
                });
            }
        }
    } else {
        const pathSegment = location.pathname.split('/').filter(Boolean)[0];
        addSpecialRoute(items, pathSegment);
    }

    return items;
};

const addSpecialRoute = (items: BreadcrumbItem[], pathSegment?: string) => {
    const specialRoutes: Record<string, BreadcrumbItem> = {
        'the-juiciest': { title: 'Самое сочное', path: '/the-juiciest' },
    };
    if (pathSegment && specialRoutes[pathSegment]) {
        items.push(specialRoutes[pathSegment]);
    }
};

const renderBreadcrumbItems = (items: BreadcrumbItem[]) =>
    items.map((item, index) => (
        <BreadcrumbItem key={`${item.path}-${index}`}>
            <BreadcrumbLink
                whiteSpace='nowrap'
                href={item.path}
                color={index !== items.length - 1 ? 'rgba(0, 0, 0, 0.64)' : 'black'}
                aria-current={index === items.length - 1 ? 'page' : undefined}
            >
                {item.title}
            </BreadcrumbLink>
        </BreadcrumbItem>
    ));
