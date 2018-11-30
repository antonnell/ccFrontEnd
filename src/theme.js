let theme =  {
  light: {
    name: 'light',
    mui: {
      type: 'light',
      overrides: {
        MuiStepIcon: {
          root: {
            color: '#888888',
            '&-active': {
              color: "#3cabff"
            }
          },
          active: {
            color: "#3cabff !important"
          },
          completed: {
            color: "#3cabff !important"
          }
        },
        MuiStepLabel: {
          label: {
            color: '#000'
          }
        },
        MuiInput: {
          underline: {
            '&:before': { //underline color when textfield is inactive
              backgroundColor: '#000',
              height: '1px'
            },
            '&:hover:not($disabled):before': { //underline color when hovered
              backgroundColor: '#000',
              height: '1px'
            },
          }
        },
        MuiFormLabel: {
          root: {
            color: '#c0c0c0'
          }
        },
        MuiInputBase: {
          root: {
            color: '#000'
          }
        },
        MuiButton: {
          root: {
            borderRadius: '20px'
          },
          label: {
            fontSize: '12px'
          },
          sizeSmall: {
            padding: '10px 20px'
          }
        },
        MuiCard: {
          root: {
            borderRadius: 0
          }
        },
        MuiTab: {
          textColorPrimary: {
            color: '#000'
          },
          selected: {
            color: '#000'
          }
        },
        MuiSnackbarContent: {
          root: {
            backgroundColor: '#3cabff'
          }
        },
        MuiPaper: {
          elevation1: {
            boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
          },
          elevation2: {
            boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
          }
        }
      },
      typography: {
        // Use the system font over Roboto.
        fontFamily: 'Abel, sans-serif',
        button: {
          fontWeight: 700
        },
        display1: {
          color: '#1a191d',
          fontSize: '22px',
          fontWeight: 'bold'
        },
        display2: {
          fontSize: '22px',
          color: '#3cabff',
          fontWeight: 'bold'
        },
        display3: {
          fontSize: '20px',
          color: '#3cabff'
        },
        body1: {
          color: '#888888',
          fontSize: '16px'
        },
        body2: {
          color: '#000',
          fontSize: '16px'
        },
        subheading: {
          color: '#1a191d'
        },
        headline:  {
          color: '#1a191d'
        }
      },
      palette: {
        primary: {
          main: '#3cabff',
          contrastText: '#f6fbff'
        },
        secondary: {
          main: '#95e2f1'
        },
        background:{
          paper: '#fff',
          default: '#fff'
        },
        text: {
          primary: '#1a191d',
          secondary: '#3cabff'
        }
      }
    },
    custom: {
      page: {
        padding: '0px'
      },
      drawer: {
        background: '#e8e9f3',
        flex: '1'
      },
      drawerIcon: {
        color: '#333'
      },
      headingBorder: {
        color: '#3cabff'
      },
      footer: {
        background: '#2b323c'
      }
    }
  },
  dark: {
    name: 'dark',
    mui: {
      type: 'dark',
      overrides: {
        MuiStepIcon: {
          root: {
            color: '#b5b5b5',
            '&-active': {
              color: "#6be6fd"
            }
          },
          active: {
            color: "#6be6fd !important"
          },
          completed: {
            color: "#6be6fd !important"
          }
        },
        MuiInput: {
          underline: {
            '&:before': { //underline color when textfield is inactive
              backgroundColor: '#6be6fd',
              height: '2px'
            },
            '&:hover:not($disabled):before': { //underline color when hovered
              backgroundColor: '#6be6fd',
              height: '2px'
            },
          }
        },
        MuiInputBase: {
          root: {
            color: '#fff'
          }
        },
        MuiButton: {
          root: {
            borderRadius: '20px'
          },
          label: {
            fontSize: '12px'
          },
          sizeSmall: {
            padding: '10px 20px'
          }
        },
        MuiCard: {
          root: {
            borderRadius: 0
          }
        },
        MuiSnackbarContent: {
          root: {
            backgroundColor: '#6be6fd'
          }
        }
      },
      typography: {
        // Use the system font over Roboto.
        fontFamily: 'Abel, sans-serif',
        button: {
          fontWeight: 700
        },
        display1: {
          color: '#fff',
          fontSize: '26px'
        },
        display2: {
          fontSize: '26px',
          color: '#6be6fd'
        },
        display3: {
          fontSize: '20px',
          color: '#6be6fd'
        },
        body1: {
          color: '#b5b5b5',
          fontSize: '16px'
        },
        body2: {
          color: '#fff',
          fontSize: '16px'
        },
        subheading: {
          color: '#fff'
        },
        headline:  {
          color: '#fff'
        }
      },
      palette: {
        primary: {
          light: '#a3ffff',
          main: '#6be6fd',
          dark: '#27b4ca',
          contrastText: '#000000',
        },
        secondary: {
          light: '#bb93ff',
          main: '#8864d8',
          dark: '#5638a6',
          contrastText: '#000000',
        },
        background:{
          paper: '#30333a',
          default: '#1a191d'
        },
        text: {
          primary: '#6be6fd',
          secondary: '#fff'
        }
      }
    },
    custom: {
      page: {
        padding: '24px'
      },
      drawer: {

      },
      drawerIcon: {
        color: '#fff'
      },
      headingBorder: {
        color: '#6be6fd'
      },
      footer: {
        background: '#30333a'
      }
    }
  }
}

module.exports = theme;
