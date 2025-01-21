import * as React from 'react';
import { ReactNode, useState, createContext } from 'react';

type UserType = 'developer' | 'business';

interface UserContextProps {
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  content: Content;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>('developer');
  const content = userType === 'developer' ? developContent : businessContent;

  return (
    <UserContext.Provider value={{ userType, setUserType, content }}>
      {children}
    </UserContext.Provider>
  );
};

interface Content {
  title: string;
  description: string;
  features: string[];
}

const developContent: Content = {
  title: "sdsdfsdf",
  description: "Developer description",
  features: ["Feature 1", "Feature 2", "Feature 3"]
}

const businessContent: Content = {
  title: "Business",
  description: "Business description",
  features: ["Feature 1", "Feature 2", "Feature 3"]
}
