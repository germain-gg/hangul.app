import React from "react";
import ReactDOM from "react-dom";

function ModalPortal({ children }: any) {
	return ReactDOM.createPortal(
		children,
		document.body
	);
}

function Modal({ children, onClose }: any) {
	return (
		<ModalPortal>
			<div className="modal-body">
				<button type="button" onClick={() => onClose()}>Close</button>
				{children}
			</div>
		</ModalPortal>
	)
}

export default Modal;
