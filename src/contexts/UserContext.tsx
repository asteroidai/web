import * as React from 'react';
import { ReactNode, useState, createContext } from 'react';

type UserType = 'developer' | 'business';

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
}

const developContent: Content = {
  title: "Build and orchestrate your AI browser workforce",
  subtitle: "Invoke with a single API call, and let us handle the rest",
  integrationCode: `
# Initialize Asteroid
run_id = asteroid_init()

# Wrap your favourite LLM client
client = asteroid_openai_client(OpenAI(), run_id)

# Wrap agent functions with custom/built-in supervisors
@supervise(human_supervisor())
def database_modify(query: str):
    """Modify the database."""
`,
  gifTitle: "Deploy & Monitor",
  gifDescription: "Integrate into Asteroid in just a few lines of code",
}

const businessContent: Content = {
  title: "Build and orchestrate your AI browser workforce",
  subtitle: "Automate your web workflows with plain English. Reliable, scalable, and fast.",
  integrationCode: '',
  gifTitle: "Take the manual out of your workflow",
  gifDescription: "Integrate into Asteroid in just a few lines of code",
}
