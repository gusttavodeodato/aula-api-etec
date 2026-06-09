// Função para geração de uma nova senha aleatória

function generateNewPassword() {
    const newPassword = (Math.random() + 1)
    .toString(36)
    .substring(2)
    .replace("j", "@")
    .replace("r", "$")
    .replace("5", "*")
    .replace("y", "#");
    return newPassword;
}

export {generateNewPassword};