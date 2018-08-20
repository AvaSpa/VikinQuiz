class StorageService {
    public saveItem = (key: string, value: string) => {
        localStorage.setItem(key, value);
    };

    public getItem = (key: string) : string | null => {
        return localStorage.getItem(key);
    };

    public itemExists = (key: string) : boolean => {
        return localStorage.hasOwnProperty(key);
    }

    public removeItem = (key: string) => {
        localStorage.removeItem(key);
    }
}

export default StorageService;
