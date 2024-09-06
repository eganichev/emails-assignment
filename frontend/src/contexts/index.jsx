import React, { createContext, useState, useEffect } from "react";


const EmailsContextProvider = createContext(undefined);

const ProviderWrapper = ({ children }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const response = await fetch('http://localhost:3001/emails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('Failed to fetch emails');
          return;
        }
  
        const data = await response.json();

        setEmails(data);
      } catch (err) {
        console.log('ERROR', err);
      }
    }

    fetchEmails();
  }, []);

  return (
    <EmailsContextProvider.Provider
      value={{
        emails,
        setEmails,
      }}
    >
      {children}
    </EmailsContextProvider.Provider>
  );
};

const useEmailsContext = () => {
  const context = React.useContext(EmailsContextProvider);

  if (context === undefined) {
    throw new Error("useEmailsContext must be used within an EmailsContextProvider");
  }

  return context;
};

export { ProviderWrapper, useEmailsContext };
