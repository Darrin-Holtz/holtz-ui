import { ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "templates",
    title: "Template",
    image: <Globe />,
  },
  {
    id: 1,
    name: "uikits",
    title: "Ui Kit",
    image: <ChefHat />,
  },
  {
    id: 2,
    name: "icons",
    title: "Icon",
    image: <PartyPopper />,
  },
];