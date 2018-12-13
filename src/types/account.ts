export interface User {
  authOTP: string;
  email: string;
  id: string;
  isGoogle2faEnabled: boolean;
  profilePhoto: string;
  token: string;
  username: string;
  verificationResult: string;
  verificationUrl: string;
  whitelistStatus: null
}
