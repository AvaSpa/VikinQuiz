
class StorageService{
    public saveItem = (key: string, value: string) => {
        localStorage.setItem(key, value);
    };

    public getItem = (key: string) : string | null => {
        return localStorage.getItem(key);
    };
}

export default StorageService;
