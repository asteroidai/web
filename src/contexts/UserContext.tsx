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
  integrationCode: string;
  gifTitle: string;
  gifDescription: string;
  outroTitle: string;
  outroDescription: string;
}

const content: Content = {
  title: "Build and orchestrate your AI browser workforce",
  subtitle: "Automate your web workflows with plain English. Reliable, scalable, and fast.",
  integrationCode: '',
  gifTitle: "Take the manual out of your workflow",
  gifDescription: "Integrate into Asteroid in just a few lines of code",
  outroTitle: "Asteroid is building mission control for AI agents",
  outroDescription: "If you're deploying AI agents or automating complex web workflows, reach out. We'd love to help.",
}
