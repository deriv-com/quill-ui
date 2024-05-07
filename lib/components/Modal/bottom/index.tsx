import { ComponentProps } from "react";
import React, { forwardRef } from "react";
import "./modal-bottom.scss";
import Modal from "../base";

export interface ModalBottomProps extends ComponentProps<typeof Modal.Base> {}

export const ModalBottom = forwardRef<HTMLDivElement, ModalBottomProps>(
    (props) => {
        return (
            <Modal.Base
                showHandleBar
                containerClassName="modal-bottom__container"
                {...props}
            ></Modal.Base>
        );
    },
);
