/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Color } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ColorUpdateFormInputValues = {
    type?: string;
    name?: string;
    value?: string;
    textDark?: boolean;
};
export declare type ColorUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    value?: ValidationFunction<string>;
    textDark?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ColorUpdateFormOverridesProps = {
    ColorUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
    textDark?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ColorUpdateFormProps = React.PropsWithChildren<{
    overrides?: ColorUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    color?: Color;
    onSubmit?: (fields: ColorUpdateFormInputValues) => ColorUpdateFormInputValues;
    onSuccess?: (fields: ColorUpdateFormInputValues) => void;
    onError?: (fields: ColorUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ColorUpdateFormInputValues) => ColorUpdateFormInputValues;
    onValidate?: ColorUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ColorUpdateForm(props: ColorUpdateFormProps): React.ReactElement;
