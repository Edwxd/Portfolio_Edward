import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js";
import axios from "axios";

export class AuthService {
  private auth0Client: Auth0Client | null = null;

  constructor() {
    this.initializeAuth0();
  }

  private async initializeAuth0() {
    console.log("Initializing Auth0...");
    this.auth0Client = await createAuth0Client({
      domain: "dev-im24qkb6l7t2yhha.ca.auth0.com",
      clientId: "COuKmAH95MAHPN2irCzsuOearf2gdsOH",
      authorizationParams: {
        redirect_uri: "http://localhost:3000",
        audience: "http://localhost:8080/api/userInfo",
        scope: "openid profile email roles",
      },
    });
  }

  private async ensureAuth0Client(): Promise<void> {
    if (!this.auth0Client) {
      await this.initializeAuth0();
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    await this.ensureAuth0Client();
    const authenticated = await this.auth0Client!.isAuthenticated();
    console.log("Is authenticated:", authenticated);
    return authenticated;
  }

  public async login() {
    await this.ensureAuth0Client();
    await this.auth0Client!.loginWithPopup();
    const isAuthenticated = await this.isAuthenticated();
    if (isAuthenticated) {
      console.log("Logged in successfully.");
      const token = await this.getToken();

      localStorage.setItem("accessToken", token);
    } else {
      console.log("Login failed.");
    }
  }

  public async logout(): Promise<void> {
    await this.ensureAuth0Client();
    console.log("Logging out...");
    await this.auth0Client!.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  // Get the access token for making API requests
  public async getToken(): Promise<string> {
    await this.ensureAuth0Client();
    const token = await this.auth0Client!.getTokenSilently();
    console.log("Retrieved token:", token);
    return token;
  }

  // Get user roles from the ID token claims
  public async getUserRoles(): Promise<string[]> {
    await this.ensureAuth0Client();
    const claims = await this.auth0Client!.getIdTokenClaims();
    console.log("User roles:", claims?.["roles"]);
    return claims?.["roles"] || [];
  }

  // Get the Management API token

  //////////////////////////////////////////////////////////
  private async getManagementApiToken(): Promise<string> {
    try {
      const response = await axios.post(
        `https://dev-im24qkb6l7t2yhha.ca.auth0.com/oauth/token`,
        {
          client_id: process.env.REACT_APP_API_ClIENT_ID,
          client_secret: process.env.REACT_APP_API_SECREAT,
          audience: process.env.REACT_APP_API_AUDIENCE,
          grant_type: "client_credentials",
        },
      );

      const token = response.data.access_token;
      return token;
    } catch (error: any) {
      console.error(
        "Error fetching Management API token:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to fetch Management API token");
    }
  }
}

const authTokenService = new AuthService();
export default authTokenService;
