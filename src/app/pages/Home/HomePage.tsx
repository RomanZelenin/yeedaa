import { useEffect } from 'react';

import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import {
    juiciestRecipesLoading,
    newestRecipesLoading,
    relevantLoading,
    setAppLoader,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';
import SectionCookingBlogs from './Sections/SectionCookingBlogs';
import SectionJuiciest from './Sections/SectionJuiciest';
import SectionNewRecipes from './Sections/SectionNewRecepies';

export default function HomePage() {
    const { getString } = useResource();
    const dispatch = useAppDispatch();
    const isNewestRecipesLoading = useAppSelector(newestRecipesLoading);
    const isJuiciestRecipesLoading = useAppSelector(juiciestRecipesLoading);
    const isRelevantLoading = useAppSelector(relevantLoading);

    useEffect(() => {
        dispatch(
            setAppLoader(isNewestRecipesLoading || isJuiciestRecipesLoading || isRelevantLoading),
        );
    }, [isNewestRecipesLoading, isJuiciestRecipesLoading, isRelevantLoading]);

    return (
        <ContentContainer title={getString('bon-appetit')}>
            <>
                <SectionNewRecipes />
                <SectionJuiciest />
                <SectionCookingBlogs />
            </>
        </ContentContainer>
    );
}
