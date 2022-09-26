import { IkasStorefrontConfig } from "@ikas/storefront-config";

export default function getMonthName(
  date: Date,
  option?: {
    month: "long" | "short";
  }
) {
  const locale = IkasStorefrontConfig.getCurrentLocale();
  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: option?.month || "long",
  });

  return monthFormatter.format(date);
}
