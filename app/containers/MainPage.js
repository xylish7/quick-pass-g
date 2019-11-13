// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainPage from '../components/MainPage/MainPage';

const mapStateToProps = state => ({
  themeMode: state.menu.themeMode
});

export default connect(mapStateToProps)(MainPage);
