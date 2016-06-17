export const REG_CODE_IRD_NUMBER_MISMATCH = 'REG_CODE_IRD_NUMBER_MISMATCH';
export const REG_CODE_USED = 'REG_CODE_USED';
export const REG_CODE_EXPIRED = 'REG_CODE_EXPIRED';
export const DUPLICATE_EMAIL = 'DUPLICATE_EMAIL';

export function errorMessage(error) {
  switch(error) {
    case REG_CODE_IRD_NUMBER_MISMATCH : {
      return 'Your ACC access code or IRD number was not recognised, please check and try again.';
    }
    case REG_CODE_USED : {
      return 'The access code you entered has been used.';
    }
    case REG_CODE_EXPIRED : {
      return 'The access code you entered has expired.';
    }
    case DUPLICATE_EMAIL : {
      return 'Sorry, this email address is already registered.';
    }
  }
  // TODO display a proper error message here
  return 'If you\'re reading this message then something has gone horribly horribly wrong.';
}
