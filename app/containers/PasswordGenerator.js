// @flow
import { connect } from 'react-redux';
import PasswordGenerator from '../components/PasswordGenerator/PasswordGenerator';

function mapStateToProps(state) {
  return {
    menu: state.menu
  };
}

export default connect(
  mapStateToProps,
  null
)(PasswordGenerator);
