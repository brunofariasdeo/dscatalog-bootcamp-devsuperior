export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123';

type LoginResponse = {
  access_token: string,
  expires_in: number,
  scope: string,
  userFirstName: string,
  userId: number,
  token_type: string,
}

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse));
};