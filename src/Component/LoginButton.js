import React from 'react';
import styled from 'styled-components';

// Define your styled button component
const StyledButton = styled.button`
  background-color: #f1f104;
  color: #000;
  border: 1px solid grey;
  border-radius: 15px;
  padding: 10px 30px;
  font-size: 16px;
  font-weight : 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  // position : relative;
  // right : 0px;


  &:hover {
    background-color: #caca05;
  }
`;
const loginButtonStyle = {
    marginLeft: 'auto', // Push the button to the right
  };
// Create your LoginButton component
function LoginButton({ onClick }) {
  return (
    <StyledButton  onClick={onClick}>
      Login
    </StyledButton>
  );
}

export default LoginButton;
