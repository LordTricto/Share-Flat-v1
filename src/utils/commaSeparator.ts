/*
const commaSeparator = (x) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  });
  return formatter.format(parseFloat(x));
  // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
};

export default commaSeparator;
*/

import formatNumber from "./formatNumber";

export default function commaSeparator(value: number | undefined | null): string {
	return formatNumber(value, true);
}
