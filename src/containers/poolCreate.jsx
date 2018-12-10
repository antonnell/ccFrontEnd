import React from 'react';
import PoolCreateComponent from './PoolCreate/components';
import createReactClass from 'create-react-class';

import { poolingEmitter, poolingDispatcher } from '../store/poolingStore';

const poolSecurities = ['public', 'private'];
let PoolCreate = createReactClass({
  getInitialState() {
    return {
      error: '',
      loading: false,
      open: false,
      poolName: '',
      poolSecurity: poolSecurities[0],
      tokenName: '',
      tokenAddress: '',
      pledgeEndDate: '',
      contractCap: '',
      yourFee: '',
      minCap: '',
      maxCap: '',
      searchUser: '',
      chooseList: '',
      addedUsers: [
        'jocko85',
        'jocko85',
        'jocko85',
        'jocko85',
        'jocko85',
        'jocko85',
        'jocko85'
      ],
      pledgesEnabled: false,
      pledgesEndDate: '',
      whitelistEnabled: false
    };
  },

  componentWillMount() {
    poolingEmitter.removeAllListeners('createPoolingContract');
    poolingEmitter.on(
      'createPoolingContract',
      this.createPoolingContractReturned
    );
  },

  createPoolingContractReturned(error, data) {
    this.setState({ addLoading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.resetInputs();
      var content = { id: this.props.user.id };
      poolingDispatcher.dispatch({
        type: 'getEtherPools',
        content,
        token: this.props.user.token
      });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  resetInputs() {
    this.setState({
      error: '',
      loading: false,
      open: false,
      poolName: '',
      poolSecurity: '',
      tokenName: '',
      tokenAddress: '',
      pledgeEndDate: '',
      contractCap: '',
      yourFee: '',
      minCap: '',
      maxCap: '',
      searchUser: '',
      chooseList: '',
      pledgesEnabled: false,
      pledgesEndDate: '',
      whitelistEnabled: false
    });
  },

  render() {
    // console.log(this.props);
    const { theme } = this.props;
    const { error, pools } = this.state;
    return (
      <PoolCreateComponent
        theme={ theme }
        error={ error }
        pools={ pools }
        whitelists={ this.state.whitelists }
        handleHome={ this.handleHome }
        poolName={ this.state.poolName }
        poolSecurity={ this.state.poolSecurity }
        poolSecurities={ poolSecurities }
        selectSecurity={ this.selectSecurity }
        tokenName={ this.state.tokenName }
        tokenAddress={ this.state.tokenAddress }
        pledgesEnabled={ this.state.pledgesEnabled }
        pledgeEndDate={ this.state.pledgeEndDate }
        contractCap={ this.state.contractCap }
        yourFee={ this.state.yourFee }
        minCap={ this.state.minCap }
        maxCap={ this.state.maxCap }
        searchUser={ this.state.searchUser }
        chooseList={ this.state.chooseList }
        selectChooseList={ this.selectChooseList }
        addedUsers={ this.state.addedUsers }
        handleChange={ this.handleChange }
        submitLaunchPool={ this.submitLaunchPool }
        optionsClicked={ this.optionsClicked }
        optionsClosed={ this.optionsClosed }
        open={ this.state.open }
        handleChecked={ this.handleChecked }
        browsePoolsClicked={ this.browsePoolsClicked }
        myInvitesClicked={ this.myInvitesClicked }
      />
    );
  },

  browsePoolsClicked() {
    window.location.hash = 'browsePools';
  },

  myInvitesClicked() {
  },

  optionsClicked() {
    this.setState({ open: true });
  },

  optionsClosed() {
    this.setState({ open: false });
  },

  handleHome() {
    window.location.hash = 'pooling';
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  handleChecked(event, name) {
    this.setState({ [name]: event.target.checked });
  },

  selectChooseList(event) {
    this.setState({ chooseList: event.target.value });
  },

  selectSecurity(event) {
    this.setState({ poolSecurity: event.target.value });
  },

  submitLaunchPool(event) {
    event.preventDefault();
    console.log('SubmitLaunchPool...');
    if (this.validate()) {
      let error = false;
      //do some validation. /care

      //get primary eth address
      let primaryEthAddress = this.props.ethAddresses.filter(add => {
        return add.isPrimary;
      });
      if (!error) {
        this.setState({ loading: true, error: null });
        console.log(this.state);
        const content = this.state;
        content.primaryEthAddress = primaryEthAddress[0].address;
        console.log(content);
        // poolingDispatcher.dispatch({
        //   type: 'createPoolingContract',
        //   content,
        //   token: this.props.user.token
        // });
      }
    }
  },

  validate() {
    //const { poolName } = this.state;
    //poolName.length > 3 && true
  }
});

export default PoolCreate;
