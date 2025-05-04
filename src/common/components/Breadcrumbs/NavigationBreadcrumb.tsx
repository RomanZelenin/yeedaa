import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link } from 'react-router';

import { breadcrumbSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

interface BreadcrumbItem {
    title: string;
    path: string;
}

export const NavigationBreadcrumb = () => {
    const breadcrumbs = useAppSelector(breadcrumbSelector);
    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
            separator='>'
            flex={1}
            fontStyle='breadcrumb'
            listProps={{ flexWrap: 'wrap' }}
        >
            {breadcrumbs.map((item, index) => (
                <BreadcrumbItem key={`${item.path}-${index}`}>
                    {item.path === '/' ? (
                        <BreadcrumbLink
                            whiteSpace='nowrap'
                            href={item.path}
                            color={
                                index !== breadcrumbs.length - 1 ? 'rgba(0, 0, 0, 0.64)' : 'black'
                            }
                            aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                        >
                            {item.title}
                        </BreadcrumbLink>
                    ) : (
                        <BreadcrumbLink
                            as={Link}
                            whiteSpace='nowrap'
                            to={item.path}
                            color={
                                index !== breadcrumbs.length - 1 ? 'rgba(0, 0, 0, 0.64)' : 'black'
                            }
                            aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                        >
                            {item.title}
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};
