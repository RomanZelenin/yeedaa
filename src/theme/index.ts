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
    textStyles: {
        profileNickname: {
            fontSize: '14px',
            lineHeight: '143%',
            fontWeight: '400',
            color: 'rgba(0, 0, 0, 0.64)',
        },
        profileName: {
            fontSize: '18px',
            lineHeight: '156%',
            fontWeight: '500',
        },
        counterIndicator: {
            fontSize: '12px',
            lineHeight: '16px',
            fontWeight: '600',
            color: 'lime.600',
        },
        breadcrumb: {
            fontSize: '16px',
            lineHeight: '150%',
            fontWeight: '400',
        },
        profileNotification: {
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: '600',
            color: 'lime.600',
        },
        writeRecipieBtn: {
            fontSize: '12px',
            lineHeight: '16px',
            fontWeigh: '400',
            color: 'rgba(0, 0, 0, 0.64)',
        },
        headerContainerTitle: {
            color: 'black',
            textAlign: 'center',
            fontSize: { base: '24px', lg: '48px' },
            fontWeight: '700',
            lineHeight: '32px',
        },
        headerContainerSubtitle: {
            color: 'rgba(0, 0, 0, 0.48)',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '20px',
        },
        searchInput: {
            fontSize: { base: '14px', lg: '18px' },
        },
        profileNameBlogCard: {
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
        },
        profileNicknameBlogCard: {
            fontSize: '14px',
            lineHeight: '143%',
            fontWeight: '400',
            color: 'rgba(0, 0, 0, 0.64)',
        },
        commentBlogCard: {
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 400,
        },
    },
});

export default theme;
