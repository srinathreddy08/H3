// src/app/interfaces/emergency-contact.interface.ts
export interface EmergencyContact {
    id?: number;            // Optional, as the ID might not be set until saved in the backend
    name: string;           // The name of the contact
    phoneNumber: string;     // The contact's phone number
    email: string;           // The contact's email address
  }
  