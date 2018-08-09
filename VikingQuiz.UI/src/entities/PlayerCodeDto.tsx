class PlayerCodeDto{
    public id: number;
    public pictureUrl: string;
    public name: string;
    public code: string;

    public constructor(pictureUrl: string, name: string, code: string){
        this.id = 20;
        this.pictureUrl = '';
        this.name = name;
    }
};

export default PlayerCodeDto;