
interface IPostMessage {
   id: string;
   email: string;
   pictureUrl: string;
}


interface IPropsSocialButton  {
   onPopupClosed: any;
   onPopupOpen: any;
   onResponseFailure: any;
   onResponseSuccesful: any;

   onPostError: any;
   onPostSuccess: any;
   clientId: string;
   postURL: string;
}


export { IPostMessage, IPropsSocialButton};