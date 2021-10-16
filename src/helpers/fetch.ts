const baseUrl='http://localhost:8080/api';


export const fetchSinToken=async({endpoint,data,method='GET'}:{endpoint:string,data:any,method?:string})=>{

    const url = `${baseUrl}/${endpoint}`;

    if(method==='GET'){
        const resp = await fetch(url);
        return await resp.json();
    }else{
        const resp = await fetch(url,{
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        return await resp.json();
    }
    
}

export const fetchConToken=async({endpoint,data,method='GET'}:{endpoint:string,data?:any,method?:string})=>{

    const url = `${baseUrl}/${endpoint}`;

    const token = localStorage.getItem('tokenChatSimple')||"";

    if(method==='GET'){
        const resp = await fetch(url,{
            method:method,
            headers:{
                'Content-Type':'application/json',
                'x-token':token
            },
        });
        return await resp.json();
    }else{
        const resp = await fetch(url,{
            method:method,
            headers:{
                'Content-Type':'application/json',
                'x-token':token
            },
            body:JSON.stringify(data)
        });
        return await resp.json();
    }
    
}