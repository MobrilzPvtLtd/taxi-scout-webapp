import React from 'react';
import styled from 'styled-components';

// Define your styled button component
const StyledButton = styled.button`
  background-color: #ffff00;
  color: #000000;
  border: solid black 1px;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  // position : absolute;
  // right : 10px;
  width : 10%;



  &:hover {
    background-color: rgb(216, 216, 3);
  }
`;
// const loginButtonStyle = {
//     marginLeft: 'auto', // Push the button to the right
//   };
// Create your LoginButton component
function LogoutButton({ onClick }) {
  return (
    <StyledButton  onClick={onClick}>
      Logout
    </StyledButton>
  );
}

export default LogoutButton;
