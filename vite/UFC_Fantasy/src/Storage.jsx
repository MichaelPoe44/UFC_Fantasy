


export const saveState = (state) => {

    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('appState', serializedState);
    }
    catch (error){
        console.error("Save state error: ", error);
    }
}   


export const loadState = () => {

    try{
        const serializedState = localStorage.getItem('appState');
        //if it has something return it if not return undefined
        return serializedState ? JSON.parse(serializedState) : undefined
    }
    catch (error){
        console.error("Load state error: ", error);
        return undefined
    }
}


export const clearState = () => {
    
    try{
        localStorage.removeItem('appState');
    }
    catch (error){
        console.error("Clear state error: ", error)
    }
}