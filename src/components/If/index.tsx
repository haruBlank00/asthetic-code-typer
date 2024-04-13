import React from "react";

type IfProps = {
  condition: boolean;
  children: React.ReactNode;
};
export function If({ condition, children }: IfProps) {
  if (condition === false) {
    return <></>;
  }

  return children;
}
