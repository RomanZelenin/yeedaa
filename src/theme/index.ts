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
                    borderRadius: '4px',
                    _placeholder: {
                        color: 'lime.800',
                    },
                    _focus: {},
                },
            },
        },
        Drawer: {
            baseStyle: {
                overlay: {
                    bg: 'rgba(0, 0, 0, 0.16)',
                    backdropFilter: 'blur(2px)',
                },
                dialog: {
                    borderRadius: '0 0 6px 6px',
                    h: 'fit-content',
                },
                body: {
                    p: 0,
                },
            },
        },
        Switch: {
            baseStyle: {
                track: {
                    _checked: {
                        bg: 'lime.400',
                    },
                },
            },
        },
        Select: {
            variants: {
                outline: {
                    field: {
                        borderColor: 'lime.400',
                        borderRadius: '6px',
                        _disabled: {
                            borderColor: 'blackAlpha.200',
                            color: 'blackAlpha.700',
                        },
                    },
                },
            },
        },
        Button: {
            variants: {
                lime: {
                    borderRadius: '6px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    border: '1px solid var(--chakra-colors-blackAlpha-200)',
                    color: 'blackAlpha.700',
                    _active: {
                        border: '1px solid var(--chakra-colors-lime-400)',
                        color: 'gray.700',
                    },
                    _disabled: {
                        borderColor: 'blackAlpha.200',
                        color: 'blackAlpha.700',
                    },
                },
            },
        },
        Checkbox: {
            variants: {
                lime: {
                    control: {
                        width: '12px',
                        height: '12px',
                        borderColor: 'lime.150',
                        _checked: {
                            bg: 'lime.400',
                            borderColor: 'lime.400',
                        },
                    },
                    icon: {
                        width: '8px',
                        height: '8px',
                        color: 'black',
                    },
                },
            },
        },
        Menu: {
            baseStyle: {
                item: {},
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
            700: '#207E00',
            800: '#134B00',
        },
        blackAlpha: {
            100: 'rgba(0, 0, 0, 0.06)',
            200: 'rgba(0, 0, 0, 0.08)',
            600: 'rgba(0, 0, 0, 0.48)',
            700: 'rgba(0, 0, 0, 0.64)',
            900: 'rgba(0, 0, 0, 0.92)',
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

        textSmLh5: {
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
        },

        textXsLh4Normal: {
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '16px',
        },
        textXsLh4Semibold: {
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '16px',
        },
        textXsLh4BoldLsw: {
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '5%',
        },

        textSmLh5Semibold: {
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
        },
        textSmLh5Normal: {
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
        },
        textSmLh5Medium: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
        },
        textLgLh7Semibold: {
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '28px',
        },
        text2xlLh8Bold: {
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '32px',
        },
        text2xlLh8Medium: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '24px',
            lineHeight: '32px',
        },
        text5xlLhNoneBold: {
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '48px',
        },
        text4xlLh10Medium: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '36px',
            lineHeight: '40px',
        },
        textMdLh6Normal: {
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
        },
        textMdLh6Medium: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
        },
    },
    layerStyles: {
        categoryTag: {
            bgColor: 'lime.50',
            color: 'black',
            borderRadius: '4px',
            columnGap: '8px',
            paddingX: '8px',
            paddingY: '2px',
        },
        timerTag: {
            bgColor: 'blackAlpha.100',
            color: 'black',
            borderRadius: '4px',
            columnGap: '8px',
            paddingX: '8px',
            paddingY: '2px',
        },
    },
});

export default theme;
