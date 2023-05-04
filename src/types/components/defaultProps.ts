import { NextComponentType, NextPageContext } from "next";

export interface IDefaultComponentProps {
  Component: NextComponentType<NextPageContext, any, { theme?: any }>;
  pageProps?: any;
}
export interface IStyleProps {
  addStyle?: string;
}
export interface IDefaultElementProps {
  type?: string;
  placeholder?: string;
}
