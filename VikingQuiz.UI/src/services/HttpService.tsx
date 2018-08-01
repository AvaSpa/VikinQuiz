import axios from 'axios';
import StorageService from './StorageService';

class HttpService{

    private storageService = new StorageService();

    public get = (url: string, options?: any) => {
        if(!url){
            return;
        }

        return axios.get(url, {...options});
    }

    public post = (url: string, body: any, options?: any) => {
        if(!url || !body){
            return;
        }

        return axios.post(url, body, {...options});
    }

    public getWithToken = (url: string, options?: any) => {
        const token = this.getToken();
       
        if(!url || !token){
            return;
        }

        const authorizationOptions = this.getAuthorizationOptions(token);
        
        return axios.get(url, {...authorizationOptions, ...options});
    }

    public postWithToken = (url: string, body: any, options?: any) => {
        const token = this.getToken();

        if(!url || !body || !token){
            return;
        }

        const authorizationOptions = this.getAuthorizationOptions(token);

        return axios.post(url, body, {...authorizationOptions, ...options});
    }

    public deleteWithToken = (url: string, options?: any) => {
        const token = this.getToken();
       
        if(!url || !token){
            return;
        }

        const authorizationOptions = this.getAuthorizationOptions(token);
        
        return axios.delete(url, {...authorizationOptions, ...options});
    }

    public putWithToken = (url: string, body: any, options?: any) => {
        const token = this.getToken();

        if(!url || !body || !token){
            return;
        }

        const authorizationOptions = this.getAuthorizationOptions(token);

        return axios.put(url, body, {...authorizationOptions, ...options});
    }

    private getToken(){
        return this.storageService.getItem('token');
    }

    private getAuthorizationOptions(token: string){
        return {
            headers: {
                Authorization:'Bearer ' + token
            },
        };        
    }

}

export default HttpService;