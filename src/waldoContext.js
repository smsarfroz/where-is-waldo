import { createContext } from "react";

const waldoContext = createContext({
    settingsData: null,
    characters: null,
    Leaderboard: null,
}); 

export { waldoContext };
