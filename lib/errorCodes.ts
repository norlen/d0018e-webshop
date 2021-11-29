export const WRONG_LOGIN_INFO = 1;
export const USER_ALREADY_EXISTS = 2;
export const ADMIN_REQUIRED = 3;

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
    case VALIDATION_ERROR:
      return message;
  }
  return `Okänt fel kontakta support med felkod ${code}`;
};
