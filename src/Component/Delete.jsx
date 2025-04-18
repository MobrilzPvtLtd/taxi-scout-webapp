import React from "react";

const DeleteAccountRequest = () => {
  return (
    <div
      style={{  
        fontFamily: "sans-serif",
      }}
      className="bg-white text-gray-800 py-28 md:py-40 px-4"
    >
      <h1>Request Account Deletion</h1>
      <p>
        If you would like to delete your account and all associated data, please
        follow the instructions below.
      </p>

      <h2>Steps to Request Deletion</h2>
      <ol>
        <li>
          Email us at{" "}
          <a className="" href="mailto:oglasidzabe@gmail.com">oglasidzabe@gmail.com</a> with the
          subject line: <strong>"Account Deletion Request"</strong>.
        </li>
        <li>
          Include the email address or phone number associated with your account
          in the message.
        </li>
        <li>
          We will confirm your identity and delete your data within 7 days of
          your request.
        </li>
      </ol>

      <h2>Data That Will Be Deleted</h2>
      <ul>
        <li>User profile (name, email, phone number, etc.)</li>
        <li>Preferences and settings</li>
        <li>Usage history</li>
        <li>
          Any other personal or sensitive data associated with your account
        </li>
      </ul>

      <h2>Data That May Be Retained</h2>
      <p>
        Some data may be retained for legal, security, or operational reasons
        (e.g., fraud prevention, tax records).
      </p>

      <h2>Need Help?</h2>
      <p>
        If you have any issues or questions, please contact us at{" "}
        <a href="mailto:oglasidzabe@gmail.com">oglasidzabe@gmail.com</a>.
      </p>

    </div>
  );
};

export default DeleteAccountRequest;
