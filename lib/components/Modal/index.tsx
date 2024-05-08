import React, { ReactNode } from "react";
import { ModalHeader } from "./base/modal-header";
import { ModalBody } from "./base/modal-body";
import { ModalBase } from "./base/base";

export interface ModalType {
    Header: typeof ModalHeader;
    Body: typeof ModalBody;
    Frame: typeof ModalBase;
}

export const Modal: ModalType = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

Modal.Frame = ModalBase;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;

export default Modal;
