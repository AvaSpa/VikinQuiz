class GameDto{
    public id: number;
    public quizId: number;
    public gameDate: string;
    public code: string;

    public constructor(quizId: number, gameDate: string, code: string){
        this.quizId = quizId;
        this.gameDate = gameDate;
        this.code = code;
    }
};

export default GameDto;