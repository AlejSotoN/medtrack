import { LoaderFunction } from "react-router-dom";
import { Entry } from "services/types";

export const entriesLoader = (getEntries: ()=> Promise<Entry[]>): LoaderFunction => async () => {
    const entries = await getEntries();
    console.log(entries);
    return { entries };
}

