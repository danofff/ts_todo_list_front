class User {
  constructor(
    public userId: string,
    public username: string,
    public token: string
  ) {
    this.userId = userId;
    this.username = username;
    this.token = token;
  }
}

export default User;
