// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Welcome from '../components/MainPage/Welcome/Welcome';
import * as VaultActions from '../actions/vault';

function mapStateToProps(state) {
  return {
    themeMode: state.menu.themeMode,
    vaults: state.vault.vaults
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(VaultActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
