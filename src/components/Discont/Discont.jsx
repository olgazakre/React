
import styles from "./Discont.module.css";
import discontImg from "../../assets/discontImg.png"
import DiscontForm from "../DiscontForm/DiscontForm";

export default function Discont(){
    return(
        <div className={styles.conteiner}>
           <h1>5% off on the first order</h1>
           <div className={styles.conteiner2}>
            <img src={discontImg} alt="dogs" />
            <DiscontForm/>
           </div>
        </div>
    )
}