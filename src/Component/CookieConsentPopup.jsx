// src/components/CookieConsentPopup.js
import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieConsentPopup = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All Cookies"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="taxiscout24-consent"
      style={{
        background: "#2B373B",
        color: "white",
        fontSize: "16px",
        textAlign: "center",
      }}
      buttonStyle={{
        background: "#000",
        color: "white",
        fontWeight: "bold",
        borderRadius: "5px",
        padding: "8px 16px",
      }}
      declineButtonStyle={{
        background: "#fff",
        color: "black",
        fontWeight: "bold",
        borderRadius: "5px",
        padding: "8px 16px",
      }}
      onAccept={() => {
      }}
      onDecline={() => {
      }}
    >
      This site uses cookies. By continuing to use this website, you agree to our use of cookies.{" "}
      <a href="/privacy-policy" className="underline">
        Cookie Policy
      </a>.
    </CookieConsent>
  );
};

export default CookieConsentPopup;
