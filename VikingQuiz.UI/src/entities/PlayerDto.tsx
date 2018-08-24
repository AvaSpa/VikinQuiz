class PlayerDto{
    public id: number;
    public pictureUrl: string;
    public name: string;

    public constructor(pictureUrl: string, name: string){
        this.pictureUrl = pictureUrl;
        this.name = name;
    }
};

export default PlayerDto;