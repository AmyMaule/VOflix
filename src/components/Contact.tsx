// <div>Contact us: contact.voflix@gmail.com</div>
import { useRef } from "react";
import axios, { AxiosResponse } from "axios";

const Contact = () => {
  const contactErrorRef = useRef<HTMLParagraphElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const contactSuccessRef = useRef<HTMLParagraphElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    axios.post(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
      "form-name": "contact",
      ...data
    })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        if (contactFormRef.current) {
          contactSuccessRef.current!.classList.remove("hide");
          contactFormRef.current.classList.add("fade-out");
          // Reset error state in case error was previously triggered
          contactErrorRef.current!.classList.add("hide");
    
          setTimeout(() => {
            const formChildren = Array.from(contactFormRef.current!.children);
            formChildren.forEach(formChild => {
              if (formChild instanceof HTMLElement) {
                formChild.classList.add("hide");
              }
            }) 
          }, 500);
        }
      } else {
        throw Error(`Error submitting form, status ${res.status}`);
      }
    })
    .catch((err: unknown) => {
      if (contactErrorRef.current) {
        contactErrorRef.current.classList.remove("hide");
      }
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    });
  }

  return (
    <div className="contact-page-container" id="contact">
      <h1 className="contact-title">Get in touch</h1>
      <p className="contact-subtitle">
        Have questions, suggestions or just want to leave a comment? We'd love to hear from you!
      </p>
      <form  className="contact-form" name="contact" onSubmit={handleSubmit} ref={contactFormRef}>
        <div className="contact-inputs-container">
          <input
            className="contact-input"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
          <input
            className="contact-input"
            type="email"
            name="email"
            placeholder="Your email"
          />
        </div>
        <textarea
          className="contact-input contact-textarea"
          name="message"
          placeholder="Your message"
          required
        />
        <button className="btn btn-contact-submit">Submit</button>
      </form>
      <p className="contact-success hide" ref={contactSuccessRef}>
        Thank you for your message!{"\n"}We'll get back to you as soon as we can.
      </p>
      <p className="contact-error hide" ref={contactErrorRef}>
        Oops! Something went wrong. Please try submitting the form again.
      </p>
    </div>
  )
}

export default Contact;
