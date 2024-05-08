import { ComponentPropsWithoutRef } from "react";
import React, { forwardRef } from "react";
import "./modal-overlay.scss";
import Modal from "../base";

export interface ModalOverlayProps
    extends ComponentPropsWithoutRef<typeof Modal.Base> {}

export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
    (props) => (
        <Modal.Base
            showCrossIcon
            containerClassName="modal-overlay__container"
            {...props}
        ></Modal.Base>
    ),
);
