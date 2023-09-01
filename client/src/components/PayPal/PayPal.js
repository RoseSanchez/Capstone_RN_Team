import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPal({price, numOfParticipants}) {

    const initialOptions = {
        "client-id": "test",
        currency: "USD",
        intent: "capture",
        "data-client-token": "abc123xyz==",
    };
    
    return (
        <PayPalScriptProvider options={{ "client-id": "AaKWska8AVlQ__jAYSC_ZVUu2vGNZqMZwnwTUWNC_QwI3CvktE0puQmePk18BI8mddsLlu6Pfqs8pWSY", "disable-funding":"paylater" }}>
            <PayPalButtons style={{ layout: "horizontal" }} forceReRender={[numOfParticipants]}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: (price),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />
        </PayPalScriptProvider>
    );
}