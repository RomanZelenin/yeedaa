import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router';

import { useCurrentCategory } from '~/common/hooks/useCurrentCategory';
import { useGetRecipeByIdQuery } from '~/query/create-recipe-api';

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

    useEffect(() => {
        const breadcrumbs = [{ title: getString('home'), path: '/' }];
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
            if (location.pathname.startsWith('/the-juiciest')) {
                breadcrumbs.push({ title: getString('juiciest'), path: '/the-juiciest' });
                if (recipeId && recipe) {
                    breadcrumbs.push({
                        title: `${recipe.title}`,
                        path: `/the-juiciest/${recipeId}#`,
                    });
                }
            } else if (location.pathname.startsWith('/new-recipe')) {
                breadcrumbs.push({ title: getString('new-recipe'), path: '/new-recipe' });
            }
        }
        setBreadcrumbs(breadcrumbs);
    }, [category, subcategory, recipe, recipeId]);

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
