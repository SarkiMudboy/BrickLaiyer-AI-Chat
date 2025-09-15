import type { JSX } from "react";
import Claude from "../assets/models/claude.svg?react";
import Gemini from "../assets/models/gemini.svg?react";
import OpenAI from "../assets/models/openai.svg?react";

export type Model = {
  id: string;
  name: string;
  description: string;
  logo: JSX.Element;
};

export const models: Model[] = [
  {
    id: "e047c365-1028-4303-8ea8-08863da3c30e",
    name: "03-mini ",
    description: "Powerful large model for challenging tasks",
    logo: <OpenAI height={18} width={18} />,
  },
  {
    id: "9933ccd7-82c6-4e63-b0f4-6b7cc2dddc32",
    name: "Claude Sonnet 4",
    description: "Powerful large model for challenging tasks",
    logo: <Claude height={18} width={18} />,
  },
  {
    id: "868566da-9157-4d8a-88a9-a73af2b4693c",
    name: "Gemini-2.5 Flash",
    description: "Powerful large model for challenging tasks",
    logo: <Gemini height={18} width={18} />,
  },
];
