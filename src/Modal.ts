import ReactDOM from "react-dom";

function Modal({ children }: any) {
	return ReactDOM.createPortal(
		children,
		document.body
	);
}

export default Modal;
