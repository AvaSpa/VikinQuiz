import ISnackbarData from "../entities/SnackBarData";


export const defaultSnackbar: ISnackbarData = {
    classes: ['snackbar','bottom-center'],
    action: {
        actionName: '',
        actionHandler: ()=>{console.log('Test!')},
        classes: ['action-btn']
    },
    message: '',
    duration: -1
}

export const errorSnackbar: ISnackbarData = {
    classes: [ 'bottom-center', 'error'],
    action: {
        actionName: 'dismiss',
        actionHandler: ()=>{console.log('Test!')},
        classes: ['action-btn', 'error-btn']
    },
    message: 'Cannot create quiz, please try again',
    duration: -1
};

export const successSnackbar: ISnackbarData = {
    classes: ['bottom-center', 'success'],
    action: {
        actionName: '',
        actionHandler: ()=>{console.log('Test!')},
        classes: ['action-btn', 'success-btn']
    },
    message: 'Quiz created',
    duration: -1
}