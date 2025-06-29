import { Button, HStack, Image, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Note } from '~/app/pages/Home/Sections/SectionCookingBlogs';
import pencil from '~/assets/icons/pencil.svg';
import { NoteCard } from '~/common/components/Cards/NoteCard';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useDeleteNoteMutation } from '~/query/create-recipe-api';
import { Error, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export const ListProfileNotes = ({
    notes,
    onClickAddNote,
    onSuccessDeleteNote,
}: {
    notes: Note[];
    onClickAddNote: () => void;
    onSuccessDeleteNote: (id: string) => void;
}) => {
    const { getString } = useResource();
    const dispatch = useAppDispatch();
    const [isShowMore, setIsShowMore] = useState(false);
    const [deleteNote, { isError, isLoading, isSuccess, data }] = useDeleteNoteMutation();

    const listDisplayedNotes = !isShowMore
        ? notes?.map((note, i) => (
              <NoteCard
                  visibility={i < 3 ? 'inherit' : 'none'}
                  note={note}
                  onClickDelete={() => {
                      deleteNote(note._id);
                  }}
              />
          ))
        : notes?.map((note) => (
              <NoteCard
                  note={note}
                  onClickDelete={() => {
                      deleteNote(note._id);
                  }}
              />
          ));

    useEffect(() => {
        if (isSuccess) {
            onSuccessDeleteNote(data.id);
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: 'Заметка удалена',
                    message: '',
                    type: 'success',
                }),
            );
        }
        if (isError) {
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: Error.SERVER,
                    message: 'Попробуйте немного позже.',
                    type: 'error',
                }),
            );
        }
    }, [isError, isLoading, isSuccess]);

    return (
        <VStack
            id='notes'
            data-test-id='blog-notes-box'
            bgColor='blackAlpha.50'
            borderRadius='16px'
            p={{ base: '12px', lg: '24px' }}
            spacing={(notes?.length ?? 0) > 0 ? '12px' : '0px'}
            align='stretch'
        >
            <HStack justify='space-between' align='center'>
                <Text textStyle='textXlLh7Bold'>
                    {getString('notes')}
                    <Text
                        as='span'
                        data-test-id='blogger-user-notes-count'
                        textStyle='textLgLh7Normal'
                        color='blackAlpha.600'
                    >
                        {` (${notes?.length})`}
                    </Text>
                </Text>

                <Button
                    data-test-id=''
                    textStyle='textSmLh5Semibold'
                    onClick={onClickAddNote}
                    alignItems='center'
                    px='12px'
                    py='6px'
                    h='32px'
                    borderRadius='6px'
                    borderColor='blackAlpha.600'
                    borderWidth='1px'
                    variant='outline'
                    leftIcon={<Image src={pencil} />}
                >
                    Новая заметка
                </Button>
            </HStack>
            <Stack>
                <SimpleGrid
                    data-test-id='blogger-user-notes-grid'
                    columns={{ base: 1, md: 3 }}
                    columnGap={{ base: '0px', md: '12px' }}
                    rowGap='12px'
                >
                    {listDisplayedNotes}
                </SimpleGrid>
                {(notes?.length ?? 0) > 3 && (
                    <Button
                        data-test-id='blogger-user-notes-button'
                        alignSelf='center'
                        onClick={() => {
                            setIsShowMore(!isShowMore);
                        }}
                        color='black'
                        variant='ghost'
                        px='16px'
                        mt={{ base: '12px', lg: '24px' }}
                    >
                        <Text fontStyle='textXsLh4Semibold'>
                            {!isShowMore ? getString('show-more') : getString('collapse')}
                        </Text>
                    </Button>
                )}
            </Stack>
        </VStack>
    );
};
