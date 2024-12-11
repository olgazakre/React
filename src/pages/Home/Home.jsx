import Banner from "../../components/Banner/Banner";
import CategoriesHome from "../../components/CategoriesHome/CategoriesHome";
import Discont from "../../components/Discont/Discont";
import SaleHome from "../../components/Sale/SaleHome";


export default function HomePage() {
    
    return(
        <div> 
        <Banner/>
        <CategoriesHome/>
        <Discont/>
        <SaleHome/>
             </div>
    )
}