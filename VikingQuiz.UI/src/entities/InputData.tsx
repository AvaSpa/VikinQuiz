class InputData {
    public id: string;
    public type: string;
    public label: string;
    public errorMessage: string;
    public value: string;
  
    public constructor(id: string, type: string, label: string, errorMessage: string){
      this.id = id;
      this.label = label;
      this.type = type;
      this.errorMessage = errorMessage;
    }
  }

  export default InputData;