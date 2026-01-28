"use client";

// Turbopack (Next 16) can sometimes trip over CJS/ESM interop for certain packages,
// resulting in named imports being `undefined` at runtime. This wrapper resolves
// exports from either `{ ...named }` or `default` shapes.

import * as ReactToastifyNS from "react-toastify";

type ReactToastifyModule = typeof import("react-toastify");

const resolvedModule = (
  (ReactToastifyNS as unknown as { default?: unknown }).default ?? ReactToastifyNS
) as ReactToastifyModule;

export const toast = resolvedModule.toast;
export const ToastContainer = resolvedModule.ToastContainer;

export type Id = import("react-toastify").Id;


