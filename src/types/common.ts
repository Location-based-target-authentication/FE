import { ReactNode } from "react";

export type Nullable<T> = T | null;

export interface HasChildren {
  children?: ReactNode;
}

export type R<T> = Promise<T>;
