'use strict'

const save = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        LocalStorage.setItem(key, serializedState)
    } catch (error) {
        console.error('Set state error: ', error.message)
    }
};

const load = key => {
    try {
        const serializedState = LocalStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error('Get state error: ', error.message);
    }
};

const remove = key => {
   try {
    LocalStorage.removeItem(key);
   } catch (error) {
    console.error('Remove item error: ', error.message)
   }
};

export default {
    save,
    load,
    remove
};