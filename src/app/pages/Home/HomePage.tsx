import { useResource } from '~/common/components/ResourceContext/ResourceContext';

import ContentContainer from '../common/Containers/ContentContainer';
import SectionCookingBlogs from './Sections/SectionCookingBlogs';
import SectionJuiciest from './Sections/SectionJuiciest';
import SectionNewRecipes from './Sections/SectionNewRecepies';

export default function HomePage() {
    const { getString } = useResource();

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
