import classes from "./Modal.module.css";

export default function Modal({ children, onDismiss }) {
    return (
        <>
            <div className={classes.backdrop} onClick={onDismiss}>
                <div
                    className={classes.modal}
                    onClick={(event) => event.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>
    );
}
