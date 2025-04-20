export function formatCurrencyVND(netPrice: number): string {
  const formattedAmount = netPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formattedAmount + " ₫";
}

export function calculateDiscountedPrice(netPrice: number, discount: number): number {
  return discount ?  (netPrice - netPrice * discount / 100) : netPrice;
}

export function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function lowercaseString(word: string): string {
  return word.toLowerCase();
}

export function slugifyString(word: string): string {
  return word
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
