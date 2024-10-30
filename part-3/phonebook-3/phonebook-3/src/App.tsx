/**
 * Main application file
 * @author wilpola
 */

// import modules
import { useState, useEffect } from "react";

// import service hooks
import phonebookProvider from "./services/people";

// Types
export interface IPeople {
  name: string;
  id: string;
  number: string;
}

function App() {
  const [phonebook, setPhonebook] = useState<IPeople[]>([]);

  useEffect(() => {
    phonebookProvider
      .getAll()
      .then((response) => {
        // let x = JSON.parse(response.data);
        console.log(response)
        setPhonebook([...response.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="m-10 max-w-screen-md mx-auto">
      <p className="text-xl font-semibold">FullStack Phonebook</p>

      {phonebook.map((i: IPeople, k: number) => {
        return <p key={k}>{i.name}</p>;
      })}
    </div>
  );
}

export default App;
