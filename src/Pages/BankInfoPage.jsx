import { Navigator } from "../Components/Navigator/Navigator"
import { RefundForm } from "../Components/RefundForm/RefundForm"
import { ButtonNavigator } from "../Components/ButtonNavigator/ButtonNavigator"
export const BankInfoPage = (props) => {
    return (
        <>
            <Navigator />
            <RefundForm />
            <ButtonNavigator />
        </>
    )
}