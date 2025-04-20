import ContentContainer from './common/Containers/ContentContainer';
import LastSection from './common/Sections/LastSection';
import SectionCookingBlogs from './common/Sections/SectionCookingBlogs';
import SectionMostPopular from './common/Sections/SectionMostPopular';
import SectionNewRecipes from './common/Sections/SectionNewRecepies';

const cards = [
    {
        subcategory: 'Вторые блюда',
        badgeIcon: '/src/assets/icons/pan.svg',
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        likesCount: 1,
        bookmarksCount: 1,
    },
    {
        subcategory: 'Вторые блюда',
        badgeIcon: '/src/assets/icons/pan.svg',
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        likesCount: 2,
        bookmarksCount: 1,
    },
];

const compactCards = [
    { icon: '/src/assets/icons/pan.svg', title: 'Стейк для вегетарианцев' },
    { icon: '/src/assets/icons/pan.svg', title: 'Котлеты из гречки и фасоли' },
    { icon: '/src/assets/icons/pot.svg', title: 'Сырный суп с лапшой и брокколи' },
];

export default function Home() {
    return (
        <ContentContainer title='Приятного аппетита!'>
            <>
                <SectionNewRecipes />
                <SectionMostPopular />
                <SectionCookingBlogs />
                <LastSection
                    title='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                    cards={cards}
                    compactCards={compactCards}
                />
            </>
        </ContentContainer>
    );
}
