import React from "react";
import { IDefaultElementProps } from "./defaultProps";
export interface IDefaultAtomsComponentProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: IDefaultElementProps;
  addStyle?: string;
}
