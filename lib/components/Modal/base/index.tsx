import React, { ReactNode } from "react";
import { ModalHeader } from "./modal-header";
import { ModalBody } from "./modal-body";
import { ModalBase } from "./base";

export interface ModalType {
    Header: typeof ModalHeader;
    Body: typeof ModalBody;
    Base: typeof ModalBase;
}

export const Modal: ModalType = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

Modal.Base = ModalBase;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;

export default Modal;
