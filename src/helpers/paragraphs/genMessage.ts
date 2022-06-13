import { mockParagraphs } from "../MockParagraph";
export const genMessage = () => {
  const arrayParagraph = mockParagraphs.split(".");
  return `${arrayParagraph[Math.floor(Math.random() * arrayParagraph.length)]}.`;
};
