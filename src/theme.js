let theme =  {
  light: {
    name: 'light',
    mui: {
      type: 'light',
      overrides: {
        MuiStepIcon: {
          root: {
            color: '#b5b5b5',
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
          fontSize: '26px'
        },
        display2: {
          fontSize: '26px',
          color: '#3cabff'
        },
        display3: {
          fontSize: '20px',
          color: '#3cabff'
        },
        body1: {
          color: '#b5b5b5',
          fontSize: '18px'
        },
        body2: {
          color: '#000',
          fontSize: '18px'
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
        background: '#e8e9f3'
      },
      headingBorder: {
        color: '#3cabff'
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
      },
      typography: {
        // Use the system font over Roboto.
        fontFamily: 'Abel, sans-serif',
        button: {
          fontWeight: 700
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
          color: '#b5b5b5'
        },
        subheading: {
          color: '#fff'
        },
        display1: {
          color: '#fff',
          fontSize: '26px'
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
      headingBorder: {
        color: '#6be6fd'
      }
    }
  }
}

module.exports = theme;
