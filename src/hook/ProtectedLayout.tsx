"use client";

import { ReactNode } from "react";
import { useProtectedRoute } from "./useProtectedRoute";

interface Props {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  useProtectedRoute(); // call your hook here

  return <>{children}</>;
}
