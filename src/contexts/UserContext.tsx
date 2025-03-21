import * as React from 'react';
import { ReactNode, useState, createContext } from 'react';

type UserType = 'default';

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>('default');

  return (
    <UserContext.Provider value={{ userType, setUserType, content }}>
      {children}
    </UserContext.Provider>
  );
};

interface UserContextProps {
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  content: Content;
}

interface Content {
  title: string;
  subtitle: string;
  tabsTitle: string;
  tabsSubtitle: string;
  pricingTitle: string;
  pricingSubtitle: string;
  gifTitle: string;
  gifDescription: string;
  outroTitle: string;
  outroDescription: string;
}

const content: Content = {
  title: "Purpose-Built for High-Stakes Browser Tasks in Regulated Industries",
  subtitle: "Insurance brokers, healthcare administrators, and operations teams use Asteroid to automate repetitive browser workflows while maintaining full oversight—saving thousands in labor costs monthly.",
  tabsTitle: "Outsource your complex web flows",
  tabsSubtitle: "Stop maintaining custom browser automations, and use Asteroid Agents to handle them.",
  pricingTitle: "Get Started",
  pricingSubtitle: "Come and talk to us about your use case",
  gifTitle: "Take the manual out of your workflow",
  gifDescription: "Integrate into Asteroid in just a few lines of code",
  outroTitle: "Asteroid is building mission control for AI agents",
  outroDescription: "If you're deploying AI agents or automating complex web workflows, reach out. We'd love to help.",
}
