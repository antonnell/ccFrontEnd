import * as React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {Contact} from "../../../types/contacts";
import {MenuItem, Paper, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import {WithContactsContext, withContactsContext} from "../../../context/ContactsContext";

const styles = (theme: Theme) =>
    createStyles({
      container: {
        position: 'relative',
      },
      gridContainer: {
        display: "flex",
        flexDirection: "column"
      },
      suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
      },
      suggestion: {
        display: 'block',
      },
      suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
      }
    });

interface State {
  userSearch: string;
  suggestions: Contact[];
  selectedUser: Contact | null;
}

interface OwnProps {
  addUserToWhitelist: (contact: Contact) => void
}


interface Props extends OwnProps, WithStyles<typeof styles>, WithContactsContext {
}

function renderInputComponent(inputProps: any) {
  const {
    classes, inputRef = () => {
    }, ref, ...other
  } = inputProps;

  return (
      <TextField
          fullWidth
          InputProps={{

            inputRef: node => {
              ref(node);
              inputRef(node);
            },
            classes: {
              input: classes.input,
            },
          }}
          {...other}
      />
  );
}

function renderSuggestion(suggestion: Contact, {query, isHighlighted}: { query: any, isHighlighted: any }) {
  const matches = match(suggestion.userName, query);
  const parts = parse(suggestion.userName, matches);

  return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
                <strong key={String(index)}>{part.text}</strong>
            ) : (
                <span key={String(index)}>{part.text}</span>
            );
          })}
        </div>
      </MenuItem>
  );
}

class AddUsers extends React.Component<Props, State> {
  readonly state: State = {
    userSearch: "",
    suggestions: [],
    selectedUser: null
  };

  public render() {
    const {classes} = this.props;
    const {suggestions, userSearch} = this.state;
    return (
        <Grid item xs={12} md={6} className={classes.gridContainer}>
          <Grid item style={{flex:1}}/>
          <Grid item xs={12} style={{flex:0}}>
            <Typography variant="h2">Add Users</Typography>
          </Grid>
          <Grid item xs={10} style={{flex:0}}>
            <Autosuggest
                renderInputComponent={renderInputComponent}
                getSuggestionValue={this.getSuggestionValue}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={this.handleSuggestionSelected}
                suggestions={suggestions}
                inputProps={{
                  classes,
                  label: "Search User",
                  placeholder: 'Clark54',
                  value: userSearch,
                  onChange: this.handleChange,
                  InputLabelProps: {
                    shrink: true,
                  },
                  margin: "normal"
                }}
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => {
                  return options.children !== null ?
                      <Paper {...options.containerProps} square>
                        {options.children}
                      </Paper> :
                      null
                }}
            />
          </Grid>

        </Grid>
    );
  }

  getSuggestionValue = (suggestion: Contact) => {
    this.setState({selectedUser: suggestion});
    return suggestion.userName;
  };

  handleChange = (event: any, {newValue}: { newValue: any }) => {
    this.setState({
      userSearch: newValue,
    });
  };

  handleSuggestionsFetchRequested = ({value}: { value: string }) => {
    const {contactsContext: {searchContacts}} = this.props;
    value.length > 2 && searchContacts(value).then(contacts => this.setState({suggestions: contacts}))
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [], userSearch: "", selectedUser: null
    });
  };

  handleSuggestionSelected = () => {
    const {addUserToWhitelist} = this.props;
    const {selectedUser} = this.state;
    selectedUser !== null && addUserToWhitelist(selectedUser);
    this.handleSuggestionsClearRequested();
  };
}

export default withStyles(styles)(withContactsContext(AddUsers)) as React.ComponentClass<OwnProps>;
