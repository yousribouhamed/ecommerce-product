"use client";

import { type ReactNode, type Ref, createContext, useContext } from "react";
import type { TextAreaProps as AriaTextAreaProps, TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { TextArea as AriaTextArea, TextField as AriaTextField } from "react-aria-components";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/lib/utils/cx";

interface BaseProps {
    /** Label text for the textarea */
    label?: string;
    /** Helper text displayed below the textarea */
    hint?: ReactNode;
}

export interface TextAreaBaseProps extends AriaTextFieldProps {
    /** Placeholder text. */
    placeholder?: string;
    /** Class name for the textarea. */
    textAreaClassName?: string;
    /** Class name for the wrapper. */
    wrapperClassName?: string;
    /** Ref for the textarea element. */
    textAreaRef?: Ref<HTMLTextAreaElement>;
    /** Number of rows to display. */
    rows?: number;
    /** Whether it's in an invalid state. */
    isInvalid?: boolean;
    /** Whether it's disabled. */
    isDisabled?: boolean;
}

export const TextAreaBase = ({
    textAreaRef,
    isInvalid,
    isDisabled,
    placeholder,
    wrapperClassName,
    textAreaClassName,
    rows = 4,
    ...props
}: TextAreaBaseProps) => {
    // If the textarea is inside a `TextAreaFieldContext`, use its context
    const context = useContext(TextAreaFieldContext);

    return (
        <div
            className={cx(
                "relative flex w-full flex-col rounded-lg bg-background shadow-xs ring-1 ring-border transition-shadow duration-100 ease-linear ring-inset focus-within:ring-2 focus-within:ring-brand",
                isDisabled && "bg-disabled_subtle ring-disabled",
                isInvalid && "ring-error_subtle focus-within:ring-error",
                context?.wrapperClassName,
                wrapperClassName,
            )}
        >
            <AriaTextArea
                {...(props as AriaTextAreaProps)}
                ref={textAreaRef}
                rows={rows}
                placeholder={placeholder}
                className={cx(
                    "m-0 w-full resize-none bg-transparent p-3 text-md text-foreground ring-0 outline-hidden placeholder:text-placeholder",
                    isDisabled && "cursor-not-allowed text-disabled",
                    context?.textAreaClassName,
                    textAreaClassName,
                )}
            />
        </div>
    );
};

TextAreaBase.displayName = "TextAreaBase";

interface TextFieldProps extends AriaTextFieldProps, BaseProps {
    textAreaClassName?: string;
    wrapperClassName?: string;
    ref?: Ref<HTMLDivElement>;
}

const TextAreaFieldContext = createContext<TextFieldProps>({});

export const TextArea = ({ className, ...props }: TextFieldProps) => {
    return (
        <TextAreaFieldContext.Provider value={props}>
            <AriaTextField
                {...props}
                data-input-wrapper
                className={(state) =>
                    cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
                }
            />
        </TextAreaFieldContext.Provider>
    );
};

TextArea.displayName = "TextArea";

interface ContactTextAreaProps extends TextFieldProps {
    /** Whether to hide required indicator from label */
    hideRequiredIndicator?: boolean;
    /** Placeholder text. */
    placeholder?: string;
    /** Number of rows. */
    rows?: number;
    /** Ref for the textarea. */
    textAreaRef?: Ref<HTMLTextAreaElement>;
}

export const ContactTextArea = ({
    placeholder,
    label,
    hint,
    hideRequiredIndicator,
    className,
    textAreaRef,
    rows,
    textAreaClassName,
    wrapperClassName,
    ...props
}: ContactTextAreaProps) => {
    return (
        <TextArea aria-label={!label ? placeholder : undefined} {...props} className={className}>
            {({ isRequired, isInvalid, isDisabled }) => (
                <>
                    {label && <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired}>{label}</Label>}

                    <TextAreaBase
                        {...{
                            textAreaRef,
                            isInvalid,
                            isDisabled,
                            placeholder,
                            rows,
                            textAreaClassName,
                            wrapperClassName,
                        }}
                    />

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextArea>
    );
};

ContactTextArea.displayName = "ContactTextArea";
