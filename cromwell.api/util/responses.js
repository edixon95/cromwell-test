const NotFound = (res, value = "Item") => {
    return res.status(404).json({ message: `${value} not found` });
};

const Exception = (res, value) => {
    return res.status(400).json({ message: value });
};

const InternalServerError = (res) => {
    return res.status(500).json({ message: "Internal server error" });
};

const NotAuthorized = (res) => {
    return res.status(401).json({ message: "Unauthorized" });
};

const Success = (res, payload = null) => {
    if (payload)
        return res.status(200).json(payload);

    return res.status(200).json({ message: "Success" });
};

module.exports = {
    NotFound,
    Exception,
    InternalServerError,
    NotAuthorized,
    Success
};