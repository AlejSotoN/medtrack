import { Doctor } from "./types";
import api from "./api";

export type NewDoctorPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  specialty?: string;
};

export async function getDoctors(): Promise<Doctor[]> {
  const response = await api.get("/doctors");
  return response.data as Doctor[];
}

export async function createDoctor(payload: NewDoctorPayload): Promise<Doctor> {
  const response = await api.post("/doctors", payload);
  return response.data as Doctor;
}

export async function updateDoctor(id: string, payload: Partial<Omit<NewDoctorPayload, "password" | "email">>): Promise<Doctor> {
  const response = await api.patch(`/doctors/${id}`, payload);
  return response.data as Doctor;
}

export async function deleteDoctor(id: string): Promise<void> {
  await api.delete(`/doctors/${id}`);
}
