// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {};

function OpenVaultButton(props: Props) {
  return (
    <div className="vault-button open-vault">
      <i className="fas fa-lock" />
    </div>
  );
}

OpenVaultButton.propTypes = {};

export default OpenVaultButton;
