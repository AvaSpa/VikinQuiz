class PlayerDto{
    public id: number;
    public pictureUrl: string;
    public name: string;
    public code: string;

    public constructor(pictureUrl: string, name: string, code: string){
        this.pictureUrl = pictureUrl;
        this.name = name;
        this.code = code;
    }
};

export default PlayerDto;