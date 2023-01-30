/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ColorCreateFormInputValues = {
    type?: string;
    name?: string;
    value?: string;
    textDark?: boolean;
};
export declare type ColorCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    value?: ValidationFunction<string>;
    textDark?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ColorCreateFormOverridesProps = {
    ColorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
    textDark?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ColorCreateFormProps = React.PropsWithChildren<{
    overrides?: ColorCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ColorCreateFormInputValues) => ColorCreateFormInputValues;
    onSuccess?: (fields: ColorCreateFormInputValues) => void;
    onError?: (fields: ColorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ColorCreateFormInputValues) => ColorCreateFormInputValues;
    onValidate?: ColorCreateFormValidationValues;
} & React.CSSProperties>;
export default function ColorCreateForm(props: ColorCreateFormProps): React.ReactElement;
