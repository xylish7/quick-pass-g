// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PasswordGenerator from '../components/PasswordGenerator/PasswordGenerator';

type Props = {};

function mapStateToProps(state) {
  return {
    menu: state.menu
  };
}

export default connect(
  mapStateToProps,
  null
)(PasswordGenerator);
