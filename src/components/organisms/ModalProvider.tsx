"use client";
import React, { createContext, useCallback, useMemo, useState } from "react";

export type ModalContextProps = {
  upModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const initialStateContext = {
  upModal: false,
  openModal: () => {},
  closeModal: () => {},
};

export const ModalProviderContext =
  createContext<ModalContextProps>(initialStateContext);

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [upModal, setUpModal] = useState(false);

  // console.log("modal context render!");

  const openModal = useCallback(() => {
    setUpModal(true);
  }, [upModal]);

  const closeModal = useCallback(() => {
    setUpModal(false);
  }, [upModal]);

  const modalInfo = useMemo(
    () => ({
      upModal,
      openModal,
      closeModal,
    }),
    [upModal, openModal, closeModal]
  ); // upModal이 변할 때마다 값 갱신

  return (
    <ModalProviderContext.Provider value={modalInfo}>
      {children}
    </ModalProviderContext.Provider>
  );
}

export default ModalProvider;
