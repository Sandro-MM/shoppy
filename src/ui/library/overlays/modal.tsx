import { forwardRef } from 'react';
import {AnimatePresence, motion as m} from 'motion/react';
import { OverlayProps } from './overlay-props';
import { useOverlayViewport } from './use-overlay-viewport';
import { Underlay } from './underlay';
import { FocusScope } from '@react-aria/focus';
import { useObjectRef } from '@react-aria/utils';
import clsx from 'clsx';

export const Modal = forwardRef<HTMLDivElement, OverlayProps>(
    (
        {
            children,
            autoFocus = false,
            restoreFocus = true,
            isDismissable = true,
            isOpen = false,
            placement = 'center',
            onClose,
            style,
            onPointerEnter,
            onPointerLeave,
        },
        ref
    ) => {
        const viewPortStyle = useOverlayViewport();
        const objRef = useObjectRef(ref);

        return (
            <AnimatePresence>
                {isOpen && (
                    <div
                        className="fixed inset-0 isolate z-modal"
                        style={{ ...viewPortStyle, ...style }}
                        onKeyDown={e => {
                            if (e.key === 'Escape') {
                                e.stopPropagation();
                                e.preventDefault();
                                onClose();
                            }
                        }}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                    >
                        <Underlay
                            key="modal-underlay"
                            onClick={() => {
                                if (isDismissable) {
                                    onClose();
                                }
                            }}
                        />
                        <m.div
                            ref={objRef}
                            className={clsx(
                                'pointer-events-none absolute inset-0 z-20 flex h-full w-full',
                                placement === 'center' && 'items-center justify-center',
                                placement === 'top' && 'items-start justify-center pt-40'
                            )}
                            role="presentation"
                            initial={{ opacity: 0, scale: placement === 'top' ? 1 : 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FocusScope restoreFocus={restoreFocus} autoFocus={autoFocus} contain>
                                {children}
                            </FocusScope>
                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        );
    }
);
