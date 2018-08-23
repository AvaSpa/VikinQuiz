import { invalidFileSizeInMegaBytes, nonExistentFile, fileNotSupported } from "../../commons/commons";

class ImageValidator {

    private errorMessage: string;

    public constructor() {
        this.errorMessage = '';
    }

    public getErrorMessage = (): string => {
        return this.errorMessage;
    }

    public isImageValid = (fileObject: any): boolean => {

        if (!this.checkFileExistence(fileObject) || !this.checkFileType(fileObject) || !this.checkFileSize(fileObject)) {
            return false;
        }

        this.errorMessage = '';
        return true;
    }

    private checkFileExistence = (fileObject: any): boolean => {
        if (!fileObject) {
            this.errorMessage = nonExistentFile;
            return false;
        }
        return true;
    }

    private checkFileType = (fileObject: any): boolean => {
        const acceptedExtensions = ['png', 'jpeg', 'gif'];
        const acceptedFormats: any = acceptedExtensions.map((type: string) => 'image/' + type);
        if (!acceptedFormats.includes(fileObject.type)) {
            this.errorMessage = fileNotSupported(acceptedExtensions);
            return false;
        }
        return true;
    }

    private checkFileSize = (fileObject: any): boolean => {
        const megabyteSize: number = 1024;
        const kilobyteSize: number = 1024;
        const numberOfMegabytes: number = 5;

        if (fileObject.size / kilobyteSize > megabyteSize * numberOfMegabytes) {
            this.errorMessage = invalidFileSizeInMegaBytes(numberOfMegabytes);
            return false;
        }
        return true;
    }
}

export default ImageValidator;