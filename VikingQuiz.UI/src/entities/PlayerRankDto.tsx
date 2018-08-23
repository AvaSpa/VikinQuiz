class PlayerRankDto{
    public name: string;
    public pictureUrl: string;
    public rank: number;
    public numberOfPlayers: number;

    public constructor(name: string, pictureUrl: string, rank: number, numberOfPlayers: number){
        this.name = name;
        this.pictureUrl = pictureUrl;
        this.rank = rank;
        this.numberOfPlayers = numberOfPlayers;
    }
}