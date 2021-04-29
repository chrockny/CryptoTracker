import AsyncStore from '@react-native-async-storage/async-storage';

class Storage{

    static instance = new Storage();

    //añadir a Data storage pasandole una key que sirve como Id y el value que es el contenido
    store = async (key,value) =>{
        try{
            await AsyncStore.setItem(key,value);
            return true;
        }
        catch(error){
            console.log("storage error",error)
            return false
        }
    }

    //Obtener data del storage con la key
    get = async(key) =>{
        try{
            return await AsyncStore.getItem(key);


        }
        catch(error){
            console.log("storage get error",error)
            throw new Error(error);
        }
    }
    //obtener toda la data del storage con las keys como una lista

    multiGet = async(keys) =>{
    try{
        return await AsyncStore.multiGet(keys);
    }
    catch(error){
        console.log("storage multiGet error",error)
    }
    }

    //Obtener todas las keys de data storage

    getAllKeys = async () =>{
        try{
            return await AsyncStore.getAllKeys();
        }
        catch(error){
            console.log("storage getAllKeys error",error)
            throw new Error(error);
        }
    }

    //Eliminar elementos del storage

    remove = async(key) =>{
        try{
        return await AsyncStore.removeItem(key)
       }
        catch(error){
           console.log("storage move error",error)
           return false;
        }
    }


}

export default Storage