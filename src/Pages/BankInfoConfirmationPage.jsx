import { Navigator } from "../Components/Navigator/Navigator";
import { ButtonNavigator } from "../Components/ButtonNavigator/ButtonNavigator";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BankInfoConfirmation } from "../Components/BankInfoConfirmation/BankInfoConfirmation";
import { useNavigate } from "react-router-dom";
import CustomerInfoWithLogout from "../Components/Customer/Customer";

export const BankInfoConfirmationPage = () => {
   const navigte = useNavigate();
   return (
    <>
        <CustomerInfoWithLogout />
        <Navigator />
        <BankInfoConfirmation />
        <div className="flex justify-center mt-10">
            <button className="w-1/5 flex items-center justify-center bg-black text-white px-2 py-4 rounded-full space-x-2"
                onClick={() => navigte('/product-list')}
            >
                <span className="text-center">Back to site</span>
                <MdOutlineKeyboardArrowRight className="text-white" />
            </button>
        </div>
    </>
   ) 
}