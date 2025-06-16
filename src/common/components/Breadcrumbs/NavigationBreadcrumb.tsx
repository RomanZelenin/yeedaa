import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router';

import { useCurrentCategory } from '~/common/hooks/useCurrentCategory';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { BloggerInfoResponse, useGetBloggerQuery } from '~/query/create-bloggers-api';
import { useGetRecipeByIdQuery } from '~/query/create-recipe-api';
import { ApplicationRoute } from '~/router';

import { useResource } from '../ResourceContext/ResourceContext';

type BreadcrumbItem = {
    title: string;
    path: string;
};

export const NavigationBreadcrumb = ({ onClickBreadcrumb }: { onClickBreadcrumb: () => void }) => {
    const { getString } = useResource();
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
    const { category: categoryName, subcategory: subcategoryName, id: recipeId } = useParams();

    const { category, subcategory } = useCurrentCategory({ categoryName, subcategoryName });
    const { data: recipe } = useGetRecipeByIdQuery(recipeId!, { skip: !recipeId });

    const { userId } = useParams();
    const currentUserId = getJWTPayload().userId;
    const { data: blogger, isSuccess: isSuccessBloggerInfo } = useGetBloggerQuery(
        { bloggerId: userId!, currentUserId: currentUserId },
        { skip: !userId },
    );

    useEffect(() => {
        const breadcrumbs: BreadcrumbItem[] = [
            { title: getString('home'), path: ApplicationRoute.INDEX },
        ];
        if (category) {
            breadcrumbs.push({
                title: `${category.title}`,
                path: `/${category.category}/${category.subCategories?.[0].category}`,
            });
            if (subcategory) {
                breadcrumbs.push({
                    title: `${subcategory.title}`,
                    path: `/${category.category}/${subcategory.category}`,
                });
                if (recipeId && recipe) {
                    breadcrumbs.push({
                        title: `${recipe.title}`,
                        path: `/${category.category}/${subcategory.category}/${recipeId}#`,
                    });
                }
            }
        } else {
            if (location.pathname.startsWith(ApplicationRoute.JUICIEST)) {
                breadcrumbs.push({ title: getString('juiciest'), path: ApplicationRoute.JUICIEST });
                if (recipeId && recipe) {
                    breadcrumbs.push({
                        title: `${recipe.title}`,
                        path: `/the-juiciest/${recipeId}#`,
                    });
                }
            } else if (location.pathname.startsWith(ApplicationRoute.NEW_RECIPE)) {
                breadcrumbs.push({
                    title: getString('new-recipe'),
                    path: ApplicationRoute.NEW_RECIPE,
                });
            } else if (location.pathname.startsWith(ApplicationRoute.BLOGS)) {
                breadcrumbs.push({ title: getString('blogs'), path: ApplicationRoute.BLOGS });
                if (userId && isSuccessBloggerInfo) {
                    const bloggerInfo = (blogger as BloggerInfoResponse).bloggerInfo;
                    breadcrumbs.push({
                        title: `${bloggerInfo.firstName} ${bloggerInfo.lastName} (@${bloggerInfo.login})`,
                        path: '#',
                    });
                }
            } else if (location.pathname.startsWith(ApplicationRoute.PROFILE)) {
                breadcrumbs.push({
                    title: getString('my-profile'),
                    path: ApplicationRoute.PROFILE,
                });
            }
        }
        setBreadcrumbs(breadcrumbs);
    }, [category, subcategory, recipe, recipeId, userId, blogger, location.pathname]);

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
                    <BreadcrumbLink
                        onClick={() => onClickBreadcrumb()}
                        as={ReactRouterLink}
                        whiteSpace='nowrap'
                        to={item.path}
                        color={index !== breadcrumbs.length - 1 ? 'rgba(0, 0, 0, 0.64)' : 'black'}
                        aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                    >
                        {item.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};
