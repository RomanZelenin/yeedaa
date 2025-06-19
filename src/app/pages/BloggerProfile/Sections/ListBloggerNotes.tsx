import { Button, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { Note } from '~/app/pages/Home/Sections/SectionCookingBlogs';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

import { NoteCard } from '../../../../common/components/Cards/NoteCard';

export const ListBloggerNotes = ({ notes }: { notes: Note[] }) => {
    const { getString } = useResource();
    const [isShowMore, setIsShowMore] = useState(false);
    const listDisplayedNotes = !isShowMore
        ? notes?.map((note, i) => (
              <NoteCard key={note._id} visibility={i < 3 ? 'inherit' : 'none'} note={note} />
          ))
        : notes?.map((note) => <NoteCard key={note._id} note={note} />);

    return (
        <VStack
            id='notes'
            data-test-id='blog-notes-box'
            bgColor='blackAlpha.50'
            borderRadius='16px'
            p={{ base: '12px', lg: '24px' }}
            spacing={notes.length > 0 ? '12px' : '0px'}
            align='stretch'
        >
            <HStack>
                <Text
                    alignSelf='start'
                    textStyle={{
                        base: 'text2xlLh7Normal',
                        lg: 'text4xlLh10Normal',
                    }}
                >
                    {getString('notes')}
                </Text>
                <Text
                    data-test-id='blogger-user-notes-count'
                    alignSelf='start'
                    textStyle={{
                        base: 'text2xlLh7Normal',
                        lg: 'text4xlLh10Normal',
                    }}
                    color='blackAlpha.600'
                >
                    ({notes?.length})
                </Text>
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
                {notes.length > 3 && (
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
