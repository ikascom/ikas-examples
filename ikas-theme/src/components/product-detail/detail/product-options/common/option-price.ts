import { formatCurrency, IkasProduct } from "@ikas/storefront";

export const formattedOptionPrice = (
  optionPrice: number | null,
  product: IkasProduct
) =>
  optionPrice
    ? `+${formatCurrency(
        optionPrice,
        product.selectedVariant.price.currency || "",
        product.selectedVariant.price.currencySymbol
      )}`
    : "";
