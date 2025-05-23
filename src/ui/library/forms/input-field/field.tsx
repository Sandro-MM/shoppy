'use client'
import React, {ComponentPropsWithoutRef, isValidElement, ReactElement, ReactNode} from 'react';
import {Adornment} from '@ui/forms/input-field/adornment';
import {InputFieldStyle} from '@ui/forms/input-field/get-input-field-class-names';
import {BaseFieldProps} from '@ui/forms/input-field/base-field-props';
import clsx from 'clsx';
import {removeEmptyValuesFromObject} from '@ui/utils/objects/remove-empty-values-from-object';

export interface FieldProps extends BaseFieldProps {
  children: ReactNode;
  wrapperProps?: ComponentPropsWithoutRef<'div'>;
  labelProps?: ComponentPropsWithoutRef<'label' | 'span'>;
  descriptionProps?: ComponentPropsWithoutRef<'div'>;
  errorMessageProps?: ComponentPropsWithoutRef<'div'>;
  fieldClassNames: InputFieldStyle;
}
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (props, ref) => {
    const {
      children,
      // Not every component that uses <Field> supports help text.
      description,
      errorMessage,
      descriptionProps = {},
      errorMessageProps = {},
      startAdornment,
      endAdornment,
      adornmentPosition,
      startAppend,
      endAppend,
      fieldClassNames,
      disabled,
      wrapperProps,
    } = props;

    return (
      <div className={fieldClassNames.wrapper} ref={ref} {...wrapperProps}>
        <Label {...props} />
        <div className={fieldClassNames.inputWrapper}>
          <Adornment
            direction="start"
            className={fieldClassNames.adornment}
            position={adornmentPosition}
          >
            {startAdornment}
          </Adornment>
          {startAppend && (
            <Append style={fieldClassNames.append} disabled={disabled}>
              {startAppend}
            </Append>
          )}
          {children}
          {endAppend && (
            <Append style={fieldClassNames.append} disabled={disabled}>
              {endAppend}
            </Append>
          )}
          <Adornment
            direction="end"
            className={fieldClassNames.adornment}
            position={adornmentPosition}
          >
            {endAdornment}
          </Adornment>
        </div>
        {description && !errorMessage && (
          <div className={fieldClassNames.description} {...descriptionProps}>
            {description}
          </div>
        )}
        {errorMessage && (
          <div className={fieldClassNames.error} {...errorMessageProps}>
            {errorMessage}
          </div>
        )}
      </div>
    );
  },
);

function Label({
  labelElementType,
  fieldClassNames,
  labelProps,
  label,
  labelSuffix,
  labelSuffixPosition = 'spaced',
  required,
}: Omit<FieldProps, 'children'>) {
  if (!label) {
    return null;
  }

  const ElementType = labelElementType || 'label';
  const labelNode = (
    <ElementType className={fieldClassNames.label} {...labelProps}>
      {label}
      {required && <span className="text-danger"> *</span>}
    </ElementType>
  );

  if (labelSuffix) {
    return (
      <div
        className={clsx(
          'mb-4 flex w-full gap-4',
          labelSuffixPosition === 'spaced' ? 'items-end' : 'items-center',
        )}
      >
        {labelNode}
        <div
          className={clsx(
            'text-xs text-muted',
            labelSuffixPosition === 'spaced' ? 'ml-auto' : '',
          )}
        >
          {labelSuffix}
        </div>
      </div>
    );
  }

  return labelNode;
}

interface AppendProps {
  children: ReactNode;
  style: InputFieldStyle['append'];
  disabled?: boolean;
}

function Append({ children, style, disabled }: AppendProps) {
  if (!isValidElement(children)) return null;

  const element = children as ReactElement<any>;

  const props = {
    ...element.props,
    disabled: element.props.disabled || disabled,
    ...removeEmptyValuesFromObject(style),
  };

  return React.cloneElement(element, props);
}
