class Http {
    static instance = new Http();
    get = async(url) =>{
        try{
            let req = await fetch(url);
            let json =  await req.json();
            return json;
        }
        catch(e){
            console.error("http get method error",e)
            throw Error(e);
        }
    }
    post = async(url,body) =>{
        try{
            let req = await fetch(url,{
                method:"POST",
                body,
            })


            let json = await req.json();
            return json;

        }
        catch(e){
            console.error("http post Method error",e);
            throw Error(e);
        }
    }
}
export default Http;