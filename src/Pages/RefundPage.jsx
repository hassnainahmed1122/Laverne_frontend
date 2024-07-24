import { Navigator } from "../Components/Navigator/Navigator";
import { RequestCard } from "../Components/RequestCard/RequestCard";

export const RefundPage = (props) => {

    return (
        <>
            <Navigator />
            <RequestCard status={"underRevision"} />
            <RequestCard status={"test"}/>         
        </>
    );
};
