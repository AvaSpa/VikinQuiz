class InputData {
   public id: string;
   public type: string;
   public label: string;
   public errorMessage: string;
   public value: string;
   public name: string;

   public constructor(id: string, type: string, label: string, errorMessage: string, name: string, value: string) {
      this.id = id;
      this.label = label;
      this.type = type;
      this.errorMessage = errorMessage;
      this.name = name;
      this.value = value;
   }

}

export default InputData;