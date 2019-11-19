// @flow
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Popup from 'reactjs-popup';

import useWindowSize from '../../hooks/WinowSize';

type Props = {
  open: boolean,
  onClose: () => void,
  children: Node
};

function GrowMenu(props: Props) {
  const { open, onClose, children } = props;

  const [menuOffset, setMenuOffset] = useState({ x: 0, y: 0 });
  const [width, height] = useWindowSize();

  const growMenuNode = useRef();

  /**
   * Depending on the height of the window and the offseTop of
   * the button, place the menu on top or at the bottom of the
   * button that trigger the menu
   */
  useEffect(
    () => {
      if (growMenuNode.current.offsetTop - height < -95)
        setMenuOffset({ x: 33, y: -29 });
      else setMenuOffset({ x: 29, y: -96 });
    },
    [height]
  );

  return (
    <div ref={growMenuNode}>
      <Popup
        open={open}
        ref={growMenuNode}
        trigger={<span />}
        position="right top"
        closeOnDocumentClick
        offsetX={menuOffset.x}
        offsetY={menuOffset.y}
        contentStyle={{ border: 'none', borderRadius: 4, padding: 0 }}
        arrow={false}
        onClose={onClose}
      >
        <ul onClick={onClose}>{children}</ul>
      </Popup>
    </div>
  );
}

GrowMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default GrowMenu;
