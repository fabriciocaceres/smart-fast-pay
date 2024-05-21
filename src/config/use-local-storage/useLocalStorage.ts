// import { useEffect, useState } from 'react';

// export function useLocalStorage<ValueType>(key: string, defaultValue: ValueType) {
//     const [value, setValue] = useState(() => {
//         const storedValue = localStorage.getItem(key);
//         return storedValue === null ? defaultValue : JSON.parse(storedValue);
//     });

//     useEffect(() => {
//         const listener = (e: StorageEvent) => {
//             if (e.storageArea === localStorage && e.key === key) {
//                 setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
//             }
//         };
//         window.addEventListener('storage', listener);

//         return () => {
//             window.removeEventListener('storage', listener);
//         };
//     }, [key, defaultValue]);

//     const setValueInLocalStorage = (newValue: ValueType) => {
//         setValue((currentValue: any) => {
//             const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
//             localStorage.setItem(key, JSON.stringify(result));
//             return result;
//         });
//     };

//     return [value, setValueInLocalStorage];
// }

export function useLocalStorage<ValueType>(key: string, defaultValue: ValueType) {
    let value = (() => {
        const storedValue = localStorage.getItem(key);
        return storedValue === null ? defaultValue : JSON.parse(storedValue);
    })();

    const setValueInLocalStorage = (newValue: ValueType) => {
        const result = typeof newValue === 'function' ? newValue(value) : newValue;
        localStorage.setItem(key, JSON.stringify(result));
        value = result;
    };

    return [value, setValueInLocalStorage];
}
