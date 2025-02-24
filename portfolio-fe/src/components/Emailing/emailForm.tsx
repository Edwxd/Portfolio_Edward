import React, { useEffect } from "react";
import axios from "axios";
import "./emailForm.css";

interface Biography {
  email: string;
}

interface EmailSenderProps {
  biography: Biography[];
  onClose: () => void; // Function to close the form
}

const EmailSender: React.FC<EmailSenderProps> = ({ biography, onClose }) => {
  const [emailData, setEmailData] = React.useState({
    to: biography[0].email, // Pre-fill recipient email
    subject: "",
    body: "",
  });
  const [responseMessage, setResponseMessage] = React.useState("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8080/api/v1/send-email", {
        params: emailData,
      });
      setResponseMessage(response.data);
    } catch (error) {
      setResponseMessage("Failed to send email");
      console.error("Error sending email:", error);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modal = document.querySelector(".email-form");
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="email-modal-overlay">
      <div className="email-form">
        <h2>Send Email</h2>
        <form onSubmit={sendEmail}>
          <input type="email" value={emailData.to} readOnly />
          <input
            type="text"
            placeholder="Subject"
            value={emailData.subject}
            onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
          />
          <input
            placeholder="Email Body"
            value={emailData.body}
            onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
          />
          <button type="submit">Send Email</button>
          <button className="close-button" onClick={onClose}>
          ✖
        </button>
          {responseMessage && <p>{responseMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default EmailSender;
