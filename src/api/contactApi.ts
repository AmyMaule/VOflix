import { postData } from "./client";
import { ContactFormDataType } from "../types";

const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

export const contactApi = {
  submitContactForm: (data: ContactFormDataType) =>
    postData(
      `https://formspree.io/f/${formspreeId}`,
      {
        ...data,
        "form-name": "contact",
      }
    ),
};
