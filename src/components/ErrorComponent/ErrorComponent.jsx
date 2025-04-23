import classes from "./ErrorComponent.module.css";

function ErrorComponent({ error }) {
    return (
        <div className={classes.error}>
            <p>{error}</p>
        </div>
    );
}

export default ErrorComponent;
