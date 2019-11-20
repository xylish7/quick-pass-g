// @flow
import { connect } from 'react-redux';
import MainPage from '../components/MainPage/MainPage';

const mapStateToProps = state => ({
  vaults: state.vault.vaults,
  openedVaults: state.vault.openedVaults
});

export default connect(mapStateToProps)(MainPage);
