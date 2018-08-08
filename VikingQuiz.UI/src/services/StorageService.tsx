
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

    public hasItem = (key: string) => {
        const value = localStorage.getItem(key);

        if(!value){
            return false;
        }

        return true;
    }


    public itemExists = (key: string) : boolean => {
        return localStorage.hasOwnProperty(key);
    }
}

export default StorageService;
