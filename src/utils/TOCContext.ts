import { createContext, useState } from "react";

export type Section = {
  id: number;
  title: string;
};

type TOCContextType = {
  sections: Section[];
  registerSection: (_: Section) => void;
  activeSection: number;
  setActiveSection: (_: number) => void;
};

export const TOCContext = createContext<TOCContextType>({
  sections: [],
  registerSection: () => {},
  activeSection: 0,
  setActiveSection: () => {},
});

export const useTOCContextValues = () => {
  const [activeSection, setActiveSection] = useState(-1);
  const [sections, setSections] = useState<Section[]>([]);

  const registerSection = (section: Section) => {
    setSections((val) => val.concat([section]));
  };

  return {
    values: {
      sections,
      registerSection,
      activeSection,
      setActiveSection,
    },
  };
};
