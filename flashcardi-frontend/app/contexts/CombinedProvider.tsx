import React from "react";
import { DeckProvider } from "./DeckProvider";
import { CardProvider } from "./CardProvider";

export const CombinedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DeckProvider>
      <CardProvider>{children}</CardProvider>
    </DeckProvider>
  );
};
