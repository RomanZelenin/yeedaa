import { useResource } from '~/components/ResourceContext/ResourceContext';

import ContentContainer from '../common/Containers/ContentContainer';
import SectionCookingBlogs from '../common/Sections/SectionCookingBlogs';
import SectionJuiciest from '../common/Sections/SectionJuiciest';
import SectionNewRecipes from '../common/Sections/SectionNewRecepies';

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
