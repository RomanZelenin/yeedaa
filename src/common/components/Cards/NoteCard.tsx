import { Card, CardBody, CardHeader, HStack, IconButton, Text } from '@chakra-ui/react';

import { Note } from '~/app/pages/Home/Sections/SectionCookingBlogs';
import { getFormattedDate } from '~/common/utils/getFormattedDate';

import { BasketIcon } from '../Icons/BasketIcon';

export const NoteCard = ({
    note,
    visibility,
    onClickDelete,
}: {
    note: Note;
    visibility?: string;
    onClickDelete?: () => void;
}) => (
    <Card
        key={note._id}
        gridTemplateRows='1em auto'
        display={visibility}
        p='16px'
        rowGap='16px'
        borderRadius='8px'
    >
        <CardHeader p={0}>
            <HStack justify='space-between'>
                <Text data-test-id='notes-card-date' textStyle='textSmLh5Normal' color='lime.600'>
                    {getFormattedDate(note.date)}
                </Text>
                {onClickDelete && (
                    <IconButton
                        data-test-id='note-delete-button'
                        bgColor='transparent'
                        icon={<BasketIcon fill='black' boxSize='14px' />}
                        aria-label='delete note'
                        onClick={onClickDelete}
                    />
                )}
            </HStack>
        </CardHeader>
        <CardBody p={0}>
            <Text data-test-id='notes-card-text' textStyle='textSmLh5Normal'>
                {note.text}
            </Text>
        </CardBody>
    </Card>
);
