'use client'
import React, {ReactElement, ReactNode, useContext} from 'react';
import clsx from 'clsx';
import {DialogContext} from './dialog-context';
import {IconButton} from '@ui/buttons/icon-button';
import {CloseIcon} from '@ui/icons/material/Close';
import {DialogSize} from './dialog';
import {ButtonSize} from '@ui/buttons/button-size';

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
  color?: string | null;
  onDismiss?: () => void;
  hideDismissButton?: boolean;
  disableDismissButton?: boolean;
  leftAdornment?: ReactNode;
  // Will hide default close button visually, but still accessible by screen readers
  rightAdornment?: ReactNode;
  // Will show between title and close button
  closeButtonIcon?: ReactElement;
  actions?: ReactNode;
  size?: DialogSize;
  padding?: string;
  justify?: string;
  showDivider?: boolean;
  titleTextSize?: string;
  titleFontWeight?: string;
  closeButtonSize?: ButtonSize;
}
export function DialogHeader(props: DialogHeaderProps) {
  const {
    children,
    className,
    color,
    onDismiss,
    leftAdornment,
    rightAdornment,
    hideDismissButton = false,
    disableDismissButton = false,
    size,
    showDivider,
    justify = 'justify-between',
    titleFontWeight = 'font-semibold',
    titleTextSize = size === 'xs' ? 'text-xs' : 'text-sm',
    closeButtonSize = size === 'xs' ? 'xs' : 'sm',
    actions,
    closeButtonIcon,
  } = props;
  const {labelId, isDismissable, close} = useContext(DialogContext);

  return (
    <div
      className={clsx(
        className,
        'flex flex-shrink-0 items-center gap-10',
        titleFontWeight,
        showDivider && 'border-b',
        getPadding(props),
        color || 'text-main',
        justify,
      )}
    >
      {leftAdornment}
      <h3
        id={labelId}
        className={clsx(titleTextSize, 'mr-auto leading-5 opacity-90')}
      >
        {children}
      </h3>
      {rightAdornment}
      {actions}
      {isDismissable && !hideDismissButton && (
        <IconButton
          aria-label="Dismiss"
          disabled={disableDismissButton}
          onClick={() => {
            if (onDismiss) {
              onDismiss();
            } else {
              close();
            }
          }}
          size={closeButtonSize}
          className={clsx('-mr-8 text-muted', rightAdornment && 'sr-only')}
        >
          {closeButtonIcon || <CloseIcon />}
        </IconButton>
      )}
    </div>
  );
}

function getPadding({size, padding}: DialogHeaderProps) {
  if (padding) {
    return padding;
  }
  switch (size) {
    case '2xs':
    case 'xs':
      return 'px-14 py-4';
    case 'sm':
      return 'px-18 py-4';
    default:
      return 'px-24 py-6';
  }
}
