import ContentContainer from '../common/Containers/ContentContainer';
import SectionCookingBlogs from '../common/Sections/SectionCookingBlogs';
import SectionJuiciest from '../common/Sections/SectionJuiciest';
import SectionNewRecipes from '../common/Sections/SectionNewRecepies';
import SectionRandomCategory from '../common/Sections/SectionRandomCategory';

export default function HomePage() {
    return (
        <ContentContainer title='Приятного аппетита!'>
            <>
                <SectionNewRecipes />
                <SectionJuiciest />
                <SectionCookingBlogs />
                <SectionRandomCategory />
            </>
        </ContentContainer>
    );
}
