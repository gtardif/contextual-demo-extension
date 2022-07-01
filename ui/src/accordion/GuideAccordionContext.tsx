import React, { useState, useContext, createContext } from "react";
import type { IFeaturedImage } from "../featured-images-types";

const GuideAccordionContext = createContext<State | undefined>(undefined);

type State = {
  image: IFeaturedImage;
  expandedSection: string | null;
  setExpandedSection: (expandedSection: string | null) => void;
};

type Props = {
  image: IFeaturedImage;
  children: React.ReactNode;
};

export function GuideAccordionProvider({ children, image }: Props) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  return (
    <GuideAccordionContext.Provider
      value={{ image, expandedSection, setExpandedSection }}
    >
      {children}
    </GuideAccordionContext.Provider>
  );
}

export function useGuideAccordion(): State {
  const state = useContext(GuideAccordionContext);
  if (state === undefined) {
    throw new Error("useGuideAccordion used outside GuideAccordionProvider");
  }

  return state;
}
