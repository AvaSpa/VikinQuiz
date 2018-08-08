
class StorageService{
    public saveItem = (key: string, value: string) => {
        localStorage.setItem(key, value);
    };

    public getItem = (key: string) : string | null => {
        return localStorage.getItem(key);
    };
    
    public removeItem = (key: string) => {
        localStorage.removeItem(key);
    };


    public itemExists = (key: string) : boolean => {
        return localStorage.hasOwnProperty(key);
    }
}

export default StorageService;
