import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    breakpoints: {
        base: '0px',
        sm: '360px',
        md: '768px',
        lg: '1440px',
        xl: '1920px',
        '2xl': '3840px',
    },
    components: {
        Accordion: {
            variants: {
                container: {
                    borderWidth: '0px',
                },
                root: {
                    borderWidth: '0px',
                },
                button: {
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                },
            },
        },
        Tabs: {
            baseStyle: {
                tab: {
                    _selected: { color: 'lime.600', borderBottom: '4px solid' },
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                },
            },
        },
        Card: {
            baseStyle: {
                container: {
                    _hover: {
                        boxShadow: `0 4px 6px -1px rgba(32, 126, 0, 0.1),
                                    0 2px 4px -1px rgba(32, 126, 0, 0.06)`,
                    },
                },
            },
        },
        Input: {
            baseStyle: {
                field: {
                    _placeholder: {
                        color: 'lime.800',
                    },
                },
            },
        },
    },
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            400: '#B1FF2E',
            600: '#2DB100',
            800: '#134B00',
        },
    },
    fonts: {
        body: 'Inter, sans-serif',
    },
});

export default theme;
