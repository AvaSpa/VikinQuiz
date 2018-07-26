class UserDto{
    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public pictureUrl: string;

    public constructor(username: string, password: string, email: string){
        this.username = username;
        this.password = password;
        this.email = email;
        this.id = 1;
        this.pictureUrl = '';
    }
};

export default UserDto;