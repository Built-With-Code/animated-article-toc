import { Section, TOCContext } from "@/utils/TOCContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContext, useState } from "react";

const HIDDEN_OFFSET = 0.05;

const TableOfContents = () => {
  const { sections, activeSection } = useContext(TOCContext);

  const processSections = (sections: Section[]) => {
    // Filter for duplicates and sort by id
    const ids = sections.map(({ id }) => id);
    const uniqueSections = sections
      .filter(({ id }, index) => !ids.includes(id, index + 1))
      .sort((a, b) => a.id - b.id);
    return uniqueSections;
  };

  // Scroll tracking
  const { scrollYProgress } = useScroll();
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Set whether component should be visible
  const [showTOC, setShowTOC] = useState(activeSection >= 0);
  scrollYProgress.on("change", (val) => {
    setShowTOC(
      activeSection >= 0 && val >= HIDDEN_OFFSET && val <= 1 - HIDDEN_OFFSET
    );
  });

  return (
    <div className="h-full px-4">
      <motion.div
        className="sticky top-20 h-[80vh] py-32 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: showTOC ? 1 : 0 }}
      >
        <div className="h-full w-0.5 bg-neutral-300 rounded-full overflow-hidden">
          <motion.div
            className="bg-neutral-800 w-full origin-top"
            style={{ height: progressHeight }}
          />
        </div>
        <div className="hidden lg:flex flex-col justify-between text-sm xl:text-base">
          {processSections(sections).map(({ id, title }) => (
            <span
              className={`transition-colors duration-200 ${
                activeSection === id ? "text-neutral-800" : "text-neutral-300"
              }`}
              key={id}
              onClick={() =>
                document
                  .getElementById(`section-${id}`)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {title}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TableOfContents;
