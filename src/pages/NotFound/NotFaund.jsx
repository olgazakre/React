import styles from "./NotFaund.module.css";
import foto404 from '../../assets/foto404.png';
import { Link } from "react-router-dom";

export default function NotFaund(){
    return(
        <div className={styles.container}>
            <img src={foto404} alt="issue 404" />
            <h1>Page Not Found</h1>
            <p>We’re sorry, the page you requested could not be found.<br/>
            Please go back to the homepage.</p>
            <Link to='/'>
            <button>Go Home</button>
            </Link>
        </div>
    )
}