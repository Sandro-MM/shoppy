import React, {ReactElement} from 'react';
import clsx from 'clsx';
import {ButtonSize, getButtonSizeStyle} from './button-size';
import {ButtonBase, ButtonBaseProps} from './button-base';
import {IconSize} from '@ui/icons/svg-icon';

export interface ButtonProps extends ButtonBaseProps {
  size?: ButtonSize;
  sizeClassName?: string;
  equalWidth?: boolean;
  startIcon?: ReactElement | null | false;
  endIcon?: ReactElement | null | false;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      startIcon,
      endIcon,
      size = 'sm',
      sizeClassName,
      className,
      equalWidth = false,
      radius = 'rounded-button',
      variant = 'text',
      disabled,
      elementType,
      replace,
      href,
      download,
      ...other
    },
    ref,
  ) => {
    const mergedClassName = clsx(
      'font-semibold',
      sizeClassName || getButtonSizeStyle(size, {equalWidth, variant}),
      className,
    );
    return (
      <ButtonBase
        className={mergedClassName}
        ref={ref}
        radius={radius}
        variant={variant}
        disabled={disabled}
        href={disabled ? undefined : href}
        download={disabled ? undefined : download}
        elementType={disabled ? undefined : elementType}
        replace={disabled ? undefined : replace}
        {...other}
      >
        {startIcon && (
          <InlineIcon position="start" icon={startIcon} size={size} />
        )}
        {children}
        {endIcon && <InlineIcon position="end" icon={endIcon} size={size} />}
      </ButtonBase>
    );
  },
);

type InlineIconProps = {
    icon: ReactElement<any>;
    position: 'start' | 'end';
  size?: IconSize | null;
};
function InlineIcon({ icon, position, size }: InlineIconProps): ReactElement {
    const { className: iconClassName, size: iconSize } = icon.props as any;
    const className = clsx(
        'm-auto',
        {
            '-ml-4 mr-8': position === 'start',
            '-mr-4 ml-8': position === 'end',
        },
        iconClassName,
    );
    return React.cloneElement(icon, { className, size: iconSize ?? size });
}
