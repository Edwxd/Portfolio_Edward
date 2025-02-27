import React, { useEffect, useState } from "react";
import axios from "axios";
import "./emailForm.css";

interface Biography {
  email: string;
}

interface EmailSenderProps {
  biography: Biography[];
  onClose: () => void;
}

const EmailSender: React.FC<EmailSenderProps> = ({ biography, onClose }) => {
  const [emailData, setEmailData] = useState({
    to: biography[0].email,
    from: "",
    subject: "",
    body: "",
  });
  
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!emailData.from.trim() || !emailData.subject.trim() || !emailData.body.trim()) {
      setResponseMessage("Please fill in all fields.");
      setIsSuccess(false);
      return;
    }

      // Check for '@' in email
  if (!emailData.from.includes("@")) {
    setResponseMessage("Email must contain '@' symbol.");
    setIsSuccess(false);
    return;
  }


    try {
      const response = await axios.get("http://localhost:8080/api/v1/send-email", {
        params: emailData,
      });
      setResponseMessage(response.data || "Email sent successfully!");
      setIsSuccess(true);

      // Reset form fields after successful email sending
    setEmailData({
      to: biography[0].email,
      from: "",
      subject: "",
      body: "",
    });
    } catch (error) {
      setResponseMessage("Failed to send email. Please try again.");
      setIsSuccess(false);
      console.error("Error sending email:", error);
    }
  };

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
          <input
            type="text"
            placeholder="From"
            value={emailData.from}
            onChange={(e) => setEmailData({ ...emailData, from: e.target.value })}
          />
          
          <input
            type="text"
            placeholder="Subject"
            value={emailData.subject}
            onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
          />

          <textarea
            placeholder="Email Body"
            value={emailData.body}
            onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
          />

          <button 
            className="email-submit-button" 
            type="submit"
            disabled={!emailData.from.trim() || !emailData.subject.trim() || !emailData.body.trim()}
          >
            Send Email
          </button>

          <button className="email-close-button" onClick={onClose}>✖</button>

          {responseMessage && (
            <p className={isSuccess === false ? "error-message" : isSuccess === true ? "success-message" : ""}>
              {responseMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailSender;
