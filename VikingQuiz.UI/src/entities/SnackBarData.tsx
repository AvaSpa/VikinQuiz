interface ISnackbarData {
    classes: any[];
    action: {
        actionName: string,
        actionHandler: any
        classes: any[]
    };
    message: string;
    duration: number;
 }
 
 export default ISnackbarData;