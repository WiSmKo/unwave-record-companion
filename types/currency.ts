export enum Currency {
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
    RSD = "RSD",
    CHF = "CHF",
    CAD = "CAD",
    AUD = "AUD",
    JPY = "JPY",
    CNY = "CNY",
    KRW = "KRW",
    INR = "INR",
    BRL = "BRL",
    MXN = "MXN",
    SEK = "SEK",
}
  
export const currencyOptions = {
    [Currency.USD]: { value: 'USD', label: 'US Dollar', symbol: '$' },
    [Currency.EUR]: { value: 'EUR', label: 'Euro', symbol: '€' },
    [Currency.GBP]: { value: 'GBP', label: 'British Pound', symbol: '£' },
    [Currency.RSD]: { value: 'RSD', label: 'Serbian Dinar', symbol: 'Дин' },
    [Currency.CHF]: { value: 'CHF', label: 'Swiss Franc', symbol: '₣' },
    [Currency.CAD]: { value: 'CAD', label: 'Canadian Dollar', symbol: '$' },
    [Currency.AUD]: { value: 'AUD', label: 'Australian Dollar', symbol: '$' },
    [Currency.JPY]: { value: 'JPY', label: 'Japanese Yen', symbol: '¥' },
    [Currency.CNY]: { value: 'CNY', label: 'Chinese Yuan', symbol: '¥' },
    [Currency.KRW]: { value: 'KRW', label: 'South Korean Won', symbol: '₩' },
    [Currency.INR]: { value: 'INR', label: 'Indian Rupee', symbol: '₹' },
    [Currency.BRL]: { value: 'BRL', label: 'Brazilian Real', symbol: 'R$' },
    [Currency.MXN]: { value: 'MXN', label: 'Mexican Peso', symbol: '$' },
    [Currency.SEK]: { value: 'SEK', label: 'Swedish Krona', symbol: 'kr' },
};

export interface CurrencyRates {
    [currency: string]: number;
}