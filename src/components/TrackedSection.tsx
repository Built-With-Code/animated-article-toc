import { TOCContext } from "@/utils/TOCContext";
import { useScroll } from "framer-motion";
import { HTMLProps, useContext, useEffect, useRef } from "react";

const TrackedSection = ({
  isFirst = false,
  isLast = false,
  sectionId,
  tocTitle,
  ...props
}: {
  isFirst?: boolean;
  isLast?: boolean;
  sectionId: number;
  tocTitle: string;
} & HTMLProps<HTMLElement>) => {
  const { registerSection, setActiveSection } = useContext(TOCContext);

  useEffect(() => {
    registerSection({
      id: sectionId,
      title: tocTitle,
    });
  }, []);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"],
  });

  scrollYProgress.on("change", (value) => {
    if (value > 0 && value < 1) {
      setActiveSection(sectionId);
    }
    if ((value <= 0 && isFirst) || (value >= 1 && isLast)) {
      setActiveSection(-1);
    }
  });

  return (
    <section
      ref={container}
      id={`section-${sectionId}`}
      style={{ scrollMargin: "20vh" }}
      {...props}
    />
  );
};

export default TrackedSection;
