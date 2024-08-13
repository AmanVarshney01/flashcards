import { flashcard } from "@/lib/types";
import { motion } from "framer-motion";
import { ChevronRight, Code } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function FlashCard({
  question,
  answer,
  code,
  description,
  language,
}: Omit<flashcard, "id">) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="perspective-1000 mx-auto flex h-[70vh] cursor-pointer items-center justify-center p-4"
      onClick={handleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="transform-style-3d relative h-full w-full transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <Card className="backface-hidden absolute h-full w-full overflow-auto bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-lg text-blue-600 dark:text-blue-400 md:text-2xl">
              Question
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-200 md:text-2xl">
              {question}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 sm:text-sm md:text-base lg:text-lg">
              {description}
            </p>
            {code && (
              <div className="mt-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                <div className="mb-2 flex items-center">
                  <Code className="text-gray-500 dark:text-gray-400" />
                </div>
                <SyntaxHighlighter
                  language={language}
                  style={a11yDark}
                  wrapLines={true}
                  wrapLongLines={true}
                  customStyle={{
                    fontSize: "0.8rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="backface-hidden rotate-y-180 absolute h-full w-full transform overflow-auto bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-lg text-green-600 dark:text-green-400 sm:text-xl md:text-2xl">
              Answer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <p className="text-base text-gray-700 dark:text-gray-300 lg:text-lg">
              {answer}
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="secondary"
          className="group bg-opacity-70 text-xs sm:text-sm md:text-base"
        >
          {isFlipped ? "View Question" : "Reveal Answer"}
          <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
}
