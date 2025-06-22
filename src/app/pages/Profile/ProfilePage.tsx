import { Stack, useDisclosure } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { AddNoteDrawer } from '~/common/components/Drawer/AddNoteDrawer';
import { useMapRecipesToCategoryPaths } from '~/common/hooks/useMapRecipesToCategoryPaths';
import { useGetBloggerRecipesQuery } from '~/query/create-recipe-api';
import { myProfile, setAppLoader } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import { ListDraftsAndRecipes } from './Sections/ListDraftsAndRecipes';
import { ListMyBookmarks } from './Sections/ListMyBookmarks';
import { ListProfileNotes } from './Sections/ListProfileNotes';
import { ProfileHeader } from './Sections/ProfileHeader';

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(myProfile);
    const {
        isOpen: addNoteDrawerIsOpen,
        onOpen: addNoteDrawerOnOpen,
        onClose: addNoteDrawerOnClose,
    } = useDisclosure();
    const { isError, isLoading, isSuccess, data } = useGetBloggerRecipesQuery(
        profile.profileInfo?._id ?? skipToken,
    );

    const [notes, setNotes] = useState(data?.notes ?? []);
    const drafts: Recipe[] = profile.profileInfo?.drafts ?? [];
    const myRecipesWithPath = useMapRecipesToCategoryPaths(data?.recipes ?? []).map((recipe) => ({
        ...recipe,
        path: `/edit-recipe${recipe.path}`,
    }));

    useEffect(() => {
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
        if (isSuccess) {
            setNotes(data.notes);
            dispatch(setAppLoader(false));
        }
        if (isError) {
            dispatch(setAppLoader(false));
        }
    }, [isError, isLoading, isSuccess]);

    if (isSuccess) {
        return (
            <EmptyConatainer>
                <>
                    <Stack px={{ base: '16px' }} rowGap='16px'>
                        <ProfileHeader profile={profile} />
                        <ListDraftsAndRecipes recipes={myRecipesWithPath} drafts={drafts} />
                        <ListProfileNotes
                            notes={notes}
                            onClickAddNote={() => addNoteDrawerOnOpen()}
                            onSuccessDeleteNote={(id) =>
                                setNotes(notes.filter((it) => it._id !== id))
                            }
                        />
                        <ListMyBookmarks recipes={data.myBookmarks} />
                    </Stack>
                    <AddNoteDrawer
                        isOpen={addNoteDrawerIsOpen}
                        onClose={addNoteDrawerOnClose}
                        onSuccess={(note) => setNotes([...notes, note])}
                    />
                </>
            </EmptyConatainer>
        );
    }
};
