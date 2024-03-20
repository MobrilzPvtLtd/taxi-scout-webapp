import React from 'react';
import styled from 'styled-components';

// Define your styled button component
const StyledButton = styled.button`
  background-color: #ffff00;
  color: #000;
  border: 1px solid black;
  border-radius: 14px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight : 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  // position : absolute;
  // right : 100px;
  // top:20px;
  width : 140px;
  // margin-top : 13px;
 

  &:hover {
    background-color: #caca05;
  }
`;

// Create your LoginButton component
function SignupButton({ onClick }) {
  return (
    <StyledButton onClick={onClick}>
      Sign Up
    </StyledButton>
  );
}

export default SignupButton;
