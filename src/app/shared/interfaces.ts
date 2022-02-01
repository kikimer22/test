export interface EnteredUserData {
  email: string;
  password: string;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Post {
  id?: string;
  title: string;
  text: string;
  authorUid: string;
  date?: Date;
}

export interface FbCreateResponse {
  name: string;
}
