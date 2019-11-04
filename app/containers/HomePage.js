// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home/Home';

type Props = {};

function mapStateToProps(state) {
  return {
    menu: state.menu
  };
}

export default connect(
  mapStateToProps,
  null
)(Home);
