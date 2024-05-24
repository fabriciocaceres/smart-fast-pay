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
