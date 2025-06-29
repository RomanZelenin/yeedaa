import { Button, Stack } from '@chakra-ui/react';

import { WriteLineIcon } from '~/common/components/Icons/WriteLineIcon';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

export const FooterCreateRecipe = ({
    onClickPublish,
    onClickSafeDraft,
}: {
    onClickPublish: () => void;
    onClickSafeDraft: () => void;
}) => {
    const { getString } = useResource();
    return (
        <>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                justifyContent='center'
                gap={{ base: '20px' }}
            >
                <Button
                    id='recipe-save-draft-button'
                    data-test-id='recipe-save-draft-button'
                    onClick={onClickSafeDraft}
                    variant='outline'
                    borderColor='blackAlpha.600'
                    leftIcon={<WriteLineIcon />}
                >
                    {getString('save-draft')}
                </Button>
                <Button
                    id='recipe-publish-recipe-button'
                    data-test-id='recipe-publish-recipe-button'
                    onClick={onClickPublish}
                    variant='solid'
                    backgroundColor='black'
                    color='white'
                >
                    {getString('publish-recipe')}
                </Button>
            </Stack>
        </>
    );
};
