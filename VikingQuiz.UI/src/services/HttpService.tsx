import axios from 'axios';
import StorageService from './StorageService';

class HttpService{

    private storage = new StorageService();

    public get = (url: string) => {
        if(!url){
            return;
        }

        return axios.get(url);
    }

    public post = (url: string, body: any) => {
        if(!url || !body){
            return;
        }

        return axios.post(url, body);
    }

    public getWithToken = (url: string) => {
        const token = this.getToken();
       
        if(!url || !token){
            return;
        }
        
    }

    public postWithToken = (url: string, body: any) => {
        const token = this.getToken();

        if(!url || !body || !token){
            return;
        }
        
    }

    private getToken(){
        return this.storage.getItem('token');
    }

}

export default HttpService;