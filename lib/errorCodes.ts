export const WRONG_LOGIN_INFO = 1;
export const USER_ALREADY_EXISTS = 2;
export const ADMIN_REQUIRED = 3;
export const INCONSISTENT_CART = 4;
export const INCONSISTENT_PRICE = 5;
export const NEGATIVE_STOCK = 6;

export const VALIDATION_ERROR = 400;
export const INTERNAL_ERROR = 500;

export const mapError = (code: number, message: string): string => {
  switch (code) {
    case WRONG_LOGIN_INFO:
      return "Felaktig inloggningsinformation";
    case USER_ALREADY_EXISTS:
      return "Denna användare finns redan";
    case ADMIN_REQUIRED:
      return "Administratörsrättigheter krävs";
    case INTERNAL_ERROR:
      return "Internt fel, försök igen senare";
    case INCONSISTENT_CART:
      return "Kundvagnen har modifierats, ladda om sidan för att se nya ändringar";
    case INCONSISTENT_PRICE:
      return "Priser på produkter har uppdaterats sedan du började, vänligen ladda om sidan";
    case NEGATIVE_STOCK:
      return "En av produkterna har tyvärr tagit slut, vänligen uppdatera sidan";
    case VALIDATION_ERROR:
      return message;
  }
  return `Okänt fel kontakta support med felkod ${code}`;
};
