import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import './chatPopup.css';
import { firestore } from './Firebase'; // Assuming you have this export in your Firebase config file

const ChatPopup = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  const rqstId = sessionStorage.id;
  const token = sessionStorage.token;

  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      try {
        // Send the message to your API
        const response = await fetch("https://admin.taxiscout24.com/api/v1/request/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: input,
            request_id: rqstId,
          }),
        });

        const json = await response.json();
        console.log('API Response:', json);

        // Add the message to Firestore after successful API response
        await addDoc(collection(firestore, 'messages'), {
          text: input,
          timestamp: new Date(),
        });

        // Clear input field
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
console.log("message" , messages)
  return (
    <div className="chat-popup">
      <div className="popup-header">Live Chat</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
          key={index}
          className={`chat-message ${msg.sender === 'driver-message' ? 'driver-message' : 'user-message'}`}
        >
            {msg.text}
          </div>
        ))}
      </div>
      <input
      id='chat_input'
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button  onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPopup;
