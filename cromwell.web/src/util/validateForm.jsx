const isValidInput = (value, shouldNotBe) => {
    return value != shouldNotBe;
};

const isValidEamil = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
}

const isMatchingPassword = (password, confirm) => {
    return password === confirm
}

const validateForm = (formObject, isRegister, onlyPass = false) => {
    const invalidInputs = []
    if (isRegister) {

        if (!isValidInput(formObject.username, ""))
            invalidInputs.push({ type: "username", message: "Username should not be empty" });

        if (!isValidInput(formObject.email, ""))
            invalidInputs.push({ type: "email", message: "Email should not be empty" });

        if (!isValidInput(formObject.password, ""))
            invalidInputs.push({ type: "password", message: "Password should not be empty" });

        if (!isValidInput(formObject.confirmPassword, ""))
            invalidInputs.push({ type: "confirmPassword", message: "Confirm Password should not be empty" });

        if (invalidInputs.length > 0)
            return invalidInputs;

        if (!isValidEamil(formObject.email))
            invalidInputs.push({ type: "email", message: "Email must be valid" });

        if (invalidInputs.length > 0)
            return invalidInputs;

        if (!isValidPassword(formObject.password))
            invalidInputs.push({ type: "password", message: "Password must contain at least 8 characters, 1 special characer, 1 uppercase character and 1 lowercase character" });

        if (invalidInputs.length > 0)
            return invalidInputs;

        if (!isMatchingPassword(formObject.password, formObject.confirmPassword))
            invalidInputs.push({ type: "confirmPassword", message: "Confirm Password must be the same as Password" });

        if (invalidInputs.length > 0)
            return invalidInputs;

        return true;

    } else if (!onlyPass) {
        if (!isValidInput(formObject.email, ""))
            invalidInputs.push({ type: "email", message: "Email should not be empty" });

        if (!isValidInput(formObject.password, ""))
            invalidInputs.push({ type: "password", message: "Password should not be empty" });

        if (invalidInputs.length > 0)
            return invalidInputs;

        return true;
    } else {
        if (!isValidInput(formObject.oldPassword, ""))
            invalidInputs.push({ type: "oldPassword", message: "Old password is required" });

        if (!isValidInput(formObject.newPassword, ""))
            invalidInputs.push({ type: "newPassword", message: "New Password should not be empty" });

        if (!isMatchingPassword(formObject.newPassword, formObject.confirmPassword))
            invalidInputs.push({ type: "confirmPassword", message: "Confirm Password must be the same as Password" });

        if (!isValidPassword(formObject.newPassword))
            invalidInputs.push({ type: "newPassword", message: "Password must contain at least 8 characters, 1 special characer, 1 uppercase character and 1 lowercase character" });

        if (invalidInputs.length > 0)
            return invalidInputs;

        return true;
    };
};

export default validateForm;