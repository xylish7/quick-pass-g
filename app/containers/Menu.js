// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu from '../components/Menu/Menu';
import * as MenuActions from '../actions/menu';

function mapStateToProps(state) {
  return {
    menu: state.menu
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MenuActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
