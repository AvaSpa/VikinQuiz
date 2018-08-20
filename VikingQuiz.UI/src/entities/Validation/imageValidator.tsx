

class imageValidator {

    private isImageValid = (fileObject: any): boolean => {

        if (!this.checkFileExistence(fileObject) || !this.checkFileType(fileObject) || !this.checkFileSize(fileObject)) {
            return false;
        }

        this.setState({
            imageError: ''
        });
        this.removeInvalidClassFromUpload();
        return true;
    }

    private checkFileExistence = (fileObject: any): boolean => {
        if (!fileObject) {
            this.setState({
                imageError: 'File doesn\'t exist',
                selectedFile: ''
            });
            this.addInvalidClassToUpload();
            return false;
        }
        return true;
    }

    private checkFileType = (fileObject: any): boolean => {
        const acceptedFormats: any = ['png', 'jpeg', 'gif'].map((type: string) => 'image/' + type);
        if (!acceptedFormats.includes(fileObject.type)) {
            this.setState({
                imageError: 'The only supported fomats are: png, jpeg, gif',
                selectedFile: ''
            });
            this.addInvalidClassToUpload();
            return false;
        }
        return true;
    }

    private checkFileSize = (fileObject: any): boolean => {
        const megabyteSize: number = 1024;
        const kilobyteSize: number = 1024;
        const numberOfMegabytes: number = 5;

        if (fileObject.size / kilobyteSize > megabyteSize * numberOfMegabytes) {
            this.setState({
                imageError: 'The size is larger than ' + numberOfMegabytes + ' MBs',
                selectedFile: ''
            });
            this.addInvalidClassToUpload();
            return false;
        }
        return true;
    }
}