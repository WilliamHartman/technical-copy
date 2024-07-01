export type Product = {
    id: string
    sku: string,
    product_description: string,
    is_active: boolean,
}

export type ProductData = {
    products: Product[]
} | any
