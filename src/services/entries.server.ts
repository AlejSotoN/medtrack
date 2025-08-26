import axios from "axios";
import {Entry} from "./types"
import { API_URL } from "../config/localhost_env";

export async function getEntries(): Promise<Entry[]> {
    const response = await axios.get(`${API_URL}/entries`);
    const result: Entry[] = response.data;
    return result;
}

export async function getEntriesByPatientId(id: string): Promise<Entry[]> {
    const response = await axios.get(`${API_URL}/entries/patient/${id}`);
    const result = response.data;
    return result;
}