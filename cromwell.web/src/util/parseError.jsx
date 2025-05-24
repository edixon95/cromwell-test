const parseError = (errors, field) => {
    if (!errors)
        return null;

    const error = errors.find((err) => err.type === field);
    return error ? error.message : null;
};

export default parseError;