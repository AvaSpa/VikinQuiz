class ImageValidator {

    private errorMessage = '';

    public getErrorMessage(){
        const message = this.errorMessage;
        this.errorMessage = '';
        return message;
    }
    
    public checkFileExistence = (fileObject: any): boolean => {
        if (!fileObject) {
            this.errorMessage = 'No file is selected';
            return false;
        }
        return true;
    }

    public checkFileType = (fileObject: any): boolean => {
        const acceptedFormats: any = ['png', 'jpeg', 'gif'].map((type: string) => 'image/' + type);
        if (!acceptedFormats.includes(fileObject.type)) {
            this.errorMessage = 'The only supported fomats are: png, jpeg, gif';
            return false;
        }
        return true;
    }

    public checkFileSize = (fileObject: any): boolean => {
        const megabyteSize: number = 1024;
        const kilobyteSize: number = 1024;
        const numberOfMegabytes: number = 5;

        if (fileObject.size / kilobyteSize > megabyteSize * numberOfMegabytes) {
            this.errorMessage =  'The size is larger than ' + numberOfMegabytes + ' MBs';
            return false;
        }
        return true;
    }
}

export default ImageValidator;