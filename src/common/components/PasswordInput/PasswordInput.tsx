import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';

export const PasswordInput = (props: InputProps) => {
    const [show, setShow] = useState(true);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup>
            <Input {...props} borderWidth='2px' type={show ? 'password' : 'text'} />
            <InputRightElement>
                <IconButton
                    data-test-id='password-visibility-button'
                    _active={{
                        bgColor: 'transparent',
                    }}
                    _focus={{
                        bgColor: 'transparent',
                    }}
                    _hover={{
                        bgColor: 'transparent',
                    }}
                    backgroundColor='transparent'
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label=''
                    onMouseDown={handleClick}
                    onMouseUp={handleClick}
                    onTouchStart={handleClick}
                />
            </InputRightElement>
        </InputGroup>
    );
};
