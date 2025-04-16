import classes from "./Modal.module.css";

export default function Modal({ children }) {
    return (
        <>
            <div className={classes.backdrop} />
            <dialog className={classes.modal}>{children}</dialog>
        </>
    );
}
