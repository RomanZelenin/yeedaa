import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';

import { Note } from '~/app/pages/Home/Sections/SectionCookingBlogs';
import { getFormattedDate } from '~/common/utils/getFormattedDate';

export const NoteCard = ({ note, visibility }: { note: Note; visibility?: string }) => (
    <Card
        gridTemplateRows='1em auto'
        display={visibility}
        p='16px'
        rowGap='16px'
        borderRadius='8px'
    >
        <CardHeader p={0}>
            <Text data-test-id='notes-card-date' textStyle='textSmLh5Normal' color='lime.600'>
                {getFormattedDate(note.date)}
            </Text>
        </CardHeader>
        <CardBody p={0}>
            <Text data-test-id='notes-card-text' textStyle='textSmLh5Normal'>
                {note.text.substring(0, 160)}
            </Text>
        </CardBody>
    </Card>
);
