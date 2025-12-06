import { useEffect } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  className = "",
  filter = true,
  duration = 0.5,
  delay = 0,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.1, { startDelay: delay }),
      }
    );
  }, [scope.current]);

  return (
    <motion.div ref={scope}>
      <div className={className}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={`opacity-0 ${filter ? "blur-[10px]" : "none"} inline-block`}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};