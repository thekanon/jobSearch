import React from "react";
import { IStyleProps, IDefaultElementProps } from "./defaultProps";
export interface IDefaultAtomsComponentProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: IDefaultElementProps;
  styleProps? : IStyleProps;
}
