// @flow
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const colorNames = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger'
};

const colors = [null, ''].concat(
  Object.keys(colorNames).map(key => colorNames[key])
);

type Props = {
  name: string,
  label?: string,
  checked?: boolean,
  className?: string,
  onClick?: (name: string, checked: boolean) => void,
  color?: string,
  type?: string,
  look?: string,
  borderless?: Boolean,
  background?: boolean,
  rightToLeft?: boolean,
  size?: string,
  disabled?: boolean
};

export default function Checkbox({
  name,
  label,
  checked,
  className,
  onClick,
  color,
  type,
  look,
  borderless,
  background,
  rightToLeft,
  size,
  disabled,
  ...props
}: Props) {
  return (
    <div className="field">
      <input
        id={name}
        className={classnames(className, 'is-checkradio', {
          [`is-${type}`]: type,
          [`is-${color}`]: color,
          [`is-${size}`]: size,
          [`is-${look}`]: look,
          'is-rtl': rightToLeft,
          'has-no-border': borderless,
          'has-background-color': background
        })}
        type={type}
        checked={checked}
        name={name}
        disabled={disabled}
        onChange={() => onClick(name, !checked)}
        {...props}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  onClick: PropTypes.func,
  color: PropTypes.oneOf(colors),
  type: PropTypes.oneOf(['checkbox', 'radio']),
  look: PropTypes.oneOf(['circle', 'block']),
  borderless: PropTypes.bool,
  background: PropTypes.bool,
  rightToLeft: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool
};

Checkbox.defaultProps = {
  label: undefined,
  checked: undefined,
  className: undefined,
  style: undefined,
  onClick: () => null,
  color: undefined,
  type: undefined,
  look: undefined,
  borderless: undefined,
  background: undefined,
  rightToLeft: undefined,
  size: undefined,
  disabled: undefined
};
