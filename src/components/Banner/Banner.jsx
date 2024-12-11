import { Link } from "react-router-dom";
import styles from "./Banner.module.css";

export default function Banner(){
return(
    <div className={styles.container}>
<h1>Amazing Discounts <br/> on Pets Products!</h1>
<Link to="/Sales"><button className={styles.but}>Check out</button></Link>
    </div>
)
}