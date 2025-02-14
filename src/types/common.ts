import { ReactNode } from "react";

export type Nullable<T> = T | null;

export interface HasChildren {
  children?: ReactNode;
}
