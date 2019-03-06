
export const colors = {
  "robin-s-egg": "#6be6fd",
  text: "#29292A",
  dark: "#29292A",
  black: '#000',
  white: '#fff',
  lightBlue: "#0FCEF3",
  darkBlue: "#2B323C",
  gray: "#ababab",
  darkGray: "#888888",
  dodgerBlue: "354356"
};

// const defaultTheme = createMuiTheme();
let customTheme =  {
  light: {
    typography: {
      useNextVariants: true,
    },
    name: 'light',
    mui: {
      typography: {
        fontFamily: ['Montserrat-Medium', 'sans-serif'].join(","),
        useNextVariants: true,
        h1: {
          letterSpacing: '0.5px',
          fontSize: 21,
          color: colors.white,
          lineHeight: "25px",
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
        },
        h2: {
          letterSpacing: '0.5px',
          fontFamily: ['Montserrat-SemiBold', 'sans-serif'].join(","),
          fontSize: '18px',
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
        },
        h3: {
          letterSpacing: '0.5px',
          fontFamily: ['Montserrat-Bold', 'sans-serif'].join(","),
          fontSize: '18px',
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          display: "inline-block"
        },
        h4: {
          fontFamily: ['Montserrat-SemiBold', 'sans-serif'].join(","),
          letterSpacing: '0.5px',
          color: colors.text,
          fontSize: '15px',
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
        },
        h5: {
          letterSpacing: '0.5px',
          fontFamily: ['Montserrat-SemiBold', 'sans-serif'].join(","),
          fontSize: '20px',
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
        },
        h6: {
          letterSpacing: '0.5px',
          fontSize: '14px',
          fontWeight: '400',
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
        },
        body1: {
          letterSpacing: '0.5px',
          fontSize: '14px'
        },
        body2: {
          letterSpacing: '0.5px',
          color: colors.gray,
          fontSize: '14px'
        },
        subtitle1: {
          fontSize: '14px',
          letterSpacing: '0.5px',
          color: colors.text
        },
        subtitle2: {
          fontSize: '12px',
          color: colors.darkGray
        }
      },
      type: 'light',
      overrides: {
        MuiList: {
          padding: {
            padding: '24px',
            paddingTop: '24px',
            paddingBottom: '24px',
          },
          root: {
            backgroundImage: "linear-gradient(#2B323C, #39495F)"
          }
        },
        MuiListItem: {
          root: {
            paddingTop: '8px',
            paddingBottom: '8px',
            borderRadius: '5px'
          },
          gutters: {
            paddingLeft: '24px',
            paddingRight: '24px'
          },
          selected: {
            backgroundColor: '#1e849e !important'
          }
        },
        MuiListItemText: {
          primary: {
            color: colors.white,
            fontSize: '14px'
          }
        },
        MuiListSubheader: {
          root: {
            color: colors.white,
            paddingBottom: '12px',
            fontSize: '14px'
          }
        },
        MuiMenuItem: {
          root: {
            height: 'auto'
          }
        },
        MuiDivider: {
          root: {
            height: '2px',
            backgroundColor: colors.white,
            marginTop: '42px',
            marginBottom: '42px'
          }
        },
        MuiStepIcon: {
          root: {
            color: colors.darkGray,
            '&-active': {
              color: colors.darkBlue
            }
          },
          active: {
            color: colors.darkBlue+" !important"
          },
          completed: {
            color: colors.darkBlue+" !important"
          },
          text: {
            fill: colors.white
          }
        },
        MuiStepLabel: {
          label: {
            color: '#000',
            letterSpacing: '0.5px'
          }
        },
        MuiInput: {
          underline: {
            '&:before': { //underline color when textfield is inactive
              backgroundColor: colors.black,
              height: '1px'
            },
            '&:hover:not($disabled):before': { //underline color when hovered
              backgroundColor: colors.black,
              height: '1px'
            },
            '&:after': { //underline color when textfield is inactive
              backgroundColor: colors.lightBlue,
              borderBottom: "2px solid "+colors.lightBlue,
              height: '1px'
            },
          }
        },
        MuiFormLabel: {
          root: {
            color: '#c0c0c0',
            fontSize: '15px',
            letterSpacing: '0.5px'
          }
        },
        MuiInputBase: {
          root: {
            color: colors.black
          },
          input: {
            letterSpacing: '0.5px'
          }
        },
        MuiInputLabel: {
          root: {
            letterSpacing: '0.5px'
          },
          focused: {
            color: colors.lightBlue+" !important"
          }
        },
        MuiButton: {
          root: {
            borderRadius: '4px'
          },
          contained: {
            backgroundColor: colors.white
          },
          label: {
            textTransform: 'none',
            letterSpacing: '0.5px'
          },
          sizeLarge: {
            fontSize: '16px',
            padding: '14px 34px',
            minWidth: '230px'
          },
          sizeSmall: {
            fontFamily: ['Montserrat-SemiBold', 'sans-serif'].join(","),
            fontSize: '12px',
            padding: '10px 24px',
            minWidth: '100px'
          }
        },
        MuiCard: {
          root: {
            borderRadius: 0
          }
        },
        MuiTab: {
          textColorPrimary: {
            color: colors.black
          },
          selected: {
            color: colors.black
          }
        },
        MuiSnackbarContent: {
          root: {
            backgroundColor: colors.darkBlue
          }
        },
        MuiPaper: {
          elevation1: {
            boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
          },
          elevation2: {
            boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
          }
        },
        MuiTable: {
          root: {
            borderSpacing: '0 15px',
            borderCollapse: 'separate'
          }
        },
        EnhancedTable: {
          tableWrapper: {
            overflowX: 'inherit'
          }
        },
        MuiTableCell: {
          root: {
            borderBottom: 'none',
            padding: "12px 24px 12px 24px"
          }
        },
        MuiTableHead: {
          root: {
            padding: '16px',
            backgroundColor: '#2f3031'
          }
        },
        MuiTableSortLabel: {
          root: {
            color: colors.white,
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            '&:hover': {
              color: colors.white
            },
            '&:focus': {
              color: colors.white
            }
          },
          active: {
            color: colors.white
          },
          focus: {
            color: colors.white
          }
        },
        MuiTableRow: {
          root: {
            marginTop: '8px',
            marginBottom: '8px',
            boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
          }
        },
        MuiToolbar: {
          gutters: {
            padding: '0px',
            paddingLeft: '0px',
            '@media (min-width: 600px)': {
              padding: '0px',
              paddingLeft: '0px',
            }
          }
        },
        MuiCheckbox: {
          root: {
            color: colors.text
          }
        },
        MuiFormControlLabel: {
          label: {
            color: colors.text,
            letterSpacing: '0.5px'
          }
        },
        MuiDialogContent: {
          root: {
            padding: '0px 12px 12px 32px'
          }
        },
        MuiCardContent: {
          root: {
            padding: '30px 40px'
          }
        }
      },

      palette: {
        primary: {
          main: colors.lightBlue,
          contrastText: colors.white
        },
        secondary: {
          main: colors.text
        },
        background:{
          paper: colors.white,
        },
        text: {
          primary: colors.text,
          secondary: colors.gray
        }
      }
    },
    custom: {
      page: {
        padding: '0px'
      },
      drawerContainer:  {
        display: 'flex'
      },
      mainContainer: {
        minHeight: "924px",
        position: "relative",
        flex: 1,
        marginLeft: '100px',
        marginRight: '24px'
      },
      drawer: {
        background: colors.darkBlue,
        flex: '1',
        minWidth: '260px'
      },
      headingBorder: {
        color: colors.darkBlue
      },
      footer: {
        background: '#2b323c'
      },
      logout: {
        border: '1px solid #1e849e',
        marginTop: '60px'
      },
      logoutText: {
        textAlign: 'center'
      },
      pageTitle: {
        flex: 1,
        paddingTop: "48px",
        paddingBottom: '60px',
        display: "flex"
      },
      pageTitleRoot: {
        color: colors.lightBlue
      },
      sectionTitle: {
        marginTop: '60px',
        marginBottom: '36px'
      },
      accountCard0: {
        maxWidth: '660px',
        margin: '24px',
        marginLeft: '0px'
      },
      accountCard1: {
        maxWidth: '660px',
        margin: '24px',
        marginRight: '0px'
      },
      accountCardSmall0: {
        marginBottom: '24px'
      },
      accountCardSmall1: {
        marginBottom: '24px'
      },
      primaryText: {
        background: colors.lightBlue,
        fontSize: '10px',
        padding: '2px 6px',
        display: 'inline-block',
        verticalAlign: 'top',
        marginLeft: '12px',
        borderRadius: '3px'
      },
      icon: {
        color: colors.darkGray
      },
      appBar: {
        background: colors.darkBlue
      },
      welcomeBase: {
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: '0px',
        position: 'absolute'
      },
      welcomeCurve: {
        fontSize: '40px',
        letterSpacing: '2px',
        color: colors.white,
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },
      welcomeText: {
        fontSize: '35px',
        letterSpacing: '2px',
        color: colors.white,
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },
      welcomeContent: {
        marginTop: '314px',
        marginBottom: '24px'
      },
      forgotPassword: {
        fontSize: "12px",
        cursor: "pointer",
        color: colors.lightBlue,
        marginTop: '24px',
        marginBottom: '24px'
      },
      resendConfirmationEmail: {
        fontSize: "15px",
        cursor: "pointer",
        margin: '0 auto',
        marginTop: "60px",
        width: '300px',
        color: colors.text
      },
      tickIcon: {
        color: colors.lightBlue,
        fontSize: '60px'
      }
    }
  }
};

export default customTheme;
