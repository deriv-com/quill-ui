import { ComponentProps } from "react";
import React, { forwardRef } from "react";
import "./modal-overlay.scss";
import Modal from "../base";

export interface ModalOverlayProps extends ComponentProps<typeof Modal.Base> {}

export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
    (props) => (
        <Modal.Base
            showCrossIcon
            containerClassName="modal-overlay__container"
            {...props}
        ></Modal.Base>
    ),
);
