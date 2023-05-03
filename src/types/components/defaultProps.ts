import { NextComponentType, NextPageContext } from 'next';

export interface IDefaultComponentProps {
  Component: NextComponentType<NextPageContext, any, { theme?: any }>;
  pageProps?: any;
}
export interface IStyleProps {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  activeColor?: string;
};
export interface IDefaultElementProps {
  type?: string;
  placeholder?: string;
}