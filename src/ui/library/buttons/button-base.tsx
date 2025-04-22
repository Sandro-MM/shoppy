'use client';

import React, {
  ComponentPropsWithRef,
  JSXElementConstructor,
  forwardRef,
} from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ButtonColor, ButtonVariant, getSharedButtonStyle } from './get-shared-button-style';
import { createEventHandler } from '@ui/utils/dom/create-event-handler';

export interface ButtonBaseProps extends Omit<ComponentPropsWithRef<'button'>, 'color'> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  value?: any;
  justify?: string;
  display?: string;
  radius?: string;
  shadow?: string;
  border?: string;
  whitespace?: string;
  form?: string;
  href?: string;
  target?: '_blank';
  rel?: string;
  replace?: boolean;
  elementType?: 'button' | 'a' | 'div' | JSXElementConstructor<any>;
  download?: boolean | string;
}

export const ButtonBase = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonBaseProps>(
    (props, ref) => {
      const {
        children,
        color = null,
        variant,
        radius,
        shadow,
        whitespace,
        justify = 'justify-center',
        className,
        href,
        form,
        border,
        elementType,
        replace,
        display,
        type = 'button',
        onClick,
        onPointerDown,
        onPointerUp,
        onKeyDown,
        target,
        rel,
        download,
        ...domProps
      } = props;

      const sharedClassName = clsx(
          'focus-visible:ring',
          getSharedButtonStyle({
            variant,
            color,
            border,
            whitespace,
            display,
            shadow,
          }),
          radius,
          justify,
          className,
      );

      // Client-side routing if `href` exists
      if (href) {
        return (
            <Link
                href={href}
                replace={replace}
                passHref
                legacyBehavior
            >
              <a
                  ref={ref as any}
                  target={target}
                  rel={rel}
                  download={download}
                  className={sharedClassName}
                  onPointerDown={createEventHandler(onPointerDown)}
                  onPointerUp={createEventHandler(onPointerUp)}
                  onClick={createEventHandler(onClick)}
                  onKeyDown={createEventHandler(onKeyDown)}
                  {...domProps}
              >
                {children}
              </a>
            </Link>
        );
      }

      // Default to button
      const Element = elementType || 'button';

      return (
          <Element
              ref={ref as any}
              form={form}
              type={type}
              className={sharedClassName}
              onPointerDown={createEventHandler(onPointerDown)}
              onPointerUp={createEventHandler(onPointerUp)}
              onClick={createEventHandler(onClick)}
              onKeyDown={createEventHandler(onKeyDown)}
              {...domProps}
          >
            {children}
          </Element>
      );
    },
);

ButtonBase.displayName = 'ButtonBase';
