import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import './chatPopup.css';

const firebaseConfig = {
    apiKey: "AIzaSyBkkm67QjmV5HoB2HMiwtyL4Xd1lHGEtt0",
    authDomain: "taxiscout24-87f68.firebaseapp.com",
    databaseURL: "https://taxiscout24-87f68-default-rtdb.firebaseio.com",
    projectId: "taxiscout24-87f68",
    storageBucket: "taxiscout24-87f68.appspot.com",
    messagingSenderId: "199864261097",
    appId: "1:199864261097:web:5c78d5f771255f92e89378",
    measurementId: "G-5PRGCFGS4K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ChatPopup = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: input,
        timestamp: new Date(),
      });
      setInput('');
    }
  };

  return (
    <div className="chat-popup">
      <div className="popup-header">Live Chat</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPopup;
