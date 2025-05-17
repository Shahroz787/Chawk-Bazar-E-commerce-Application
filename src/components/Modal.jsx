import React from "react";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <StyledModal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-btn">×</button>
        {children}
      </ModalContent>
    </StyledModal>
  );
};

export default Modal;

// Styled components for Modal
const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  position: relative;

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #ff4d4d;
    color: white;
    border: none;
    font-size: 1.8rem;
    font-weight: bold;
    padding: 0.4rem 0.8rem;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, background-color 0.2s ease;

    &:hover {
      background-color: #ff1a1a;
      transform: scale(1.1);
    }

    &:focus {
      outline: none;
    }
  }
`;
