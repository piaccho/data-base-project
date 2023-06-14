export interface Product {
    _id: {
        $oid: string;
    };
    name: string;
    category: string;
    description: string;
    price: number;
    units: number;
    image: string;
}
