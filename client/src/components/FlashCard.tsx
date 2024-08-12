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
      className="perspective-1000 mx-auto flex h-[80vh] w-full max-w-7xl cursor-pointer items-center justify-center p-4 sm:w-[90vw] sm:p-6 md:w-[80vw] md:p-8 lg:w-[70vw] lg:p-10 xl:w-[60vw] 2xl:w-[50vw]"
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
            <CardTitle className="text-lg text-blue-600 dark:text-blue-400 sm:text-xl md:text-2xl lg:text-3xl">
              Question
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-200 sm:text-lg md:text-xl">
              {question}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base md:text-lg">
              {description}
            </p>
            {code && (
              <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="mb-2 flex items-center">
                  <Code className="mr-2 text-gray-500 dark:text-gray-400" />
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Code Example
                  </h4>
                </div>
                <SyntaxHighlighter language={language} style={a11yDark}>
                  {code}
                </SyntaxHighlighter>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="backface-hidden rotate-y-180 absolute h-full w-full transform overflow-auto bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-lg text-green-600 dark:text-green-400 sm:text-xl md:text-2xl lg:text-3xl">
              Answer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-6 text-sm text-gray-700 dark:text-gray-300 sm:text-base md:text-lg">
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
        <Button variant="secondary" className="group bg-opacity-70">
          {isFlipped ? "View Question" : "Reveal Answer"}
          <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
}
