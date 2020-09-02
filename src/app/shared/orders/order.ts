export class orderObject{
	id: string;
    reference: string;
    shortReference: string;
    createdAt: string;
    scheduled: boolean;
    type: string;
    merchant: {
		id: string;
        shortId: string;
        name: string;
        address: {
            formattedAddress: string;
            country: string;
            state: string;
            city: string;
            neighborhood: string;
            streetName: string;
            streetNumber: string;
            postalCode: string;
        }
	};
	payments: Array<Object>;
    customer: Object;
    items: Array<Object>
    subTotal: string;
    totalPrice: string;
    deliveryFee: string;
    deliveryAddress: Object;
    deliveryDateTime: string;
    preparationStartDateTime: string;
    localizer: Object;
    preparationTimeInSeconds: string;
    isTest: boolean;
}