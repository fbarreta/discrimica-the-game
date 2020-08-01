import { useState } from 'react';

function useForm(defaultEmpty) {
    const [values, setValues] = useState(defaultEmpty);

    function setValue(key, value) {
        setValues({
            ...values,
            [key]: value    
        });
    }

    function handleChange(e) {
        setValue(
            e.target.getAttribute('name'),
            e.target.value
        );
    }

    function clearForm() {
        setValues(defaultEmpty);
    }

    return {
        values,
        handleChange,
        clearForm
    };
}

export default useForm;
