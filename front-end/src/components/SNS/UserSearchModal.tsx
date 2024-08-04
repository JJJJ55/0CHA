import React, { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

import SearchProfile from './SearchProfile';

import test from '../../asset/img/testImg.png';


const s = {
  Container: styled.section`
    height: 100%;
    overflow-y: auto;
  `,
  ReactModal: styled(ReactModal)`
    height: 100%;
  `,
};


const UserSearchModal = (): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const toggleModal = () => {
    setModalIsOpen(false);
  }

  return (
    <>
    <s.ReactModal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}

      onRequestClose={toggleModal}
      style={{
        overlay: {
          width: "100%",
          height: "calc(100% - 125px)",
          maxWidth: "800px",
          backgroundColor: "#000000",
          top: "calc(50% - 5px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
        content: {
          color: "#ffffff",

        }
      }}
    >
      <s.Container>
        <SearchProfile
          profileImage={test}
          username='asdf'
        />
        <SearchProfile
          profileImage={test}
          username='asdf'
        />
        <SearchProfile
          profileImage={test}
          username='asdf'
        />
        <SearchProfile
          profileImage={test}
          username='asdf'
        />
      </s.Container>
    </s.ReactModal>
    </>
  );
};

export default UserSearchModal;
