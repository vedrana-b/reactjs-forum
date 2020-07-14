
const hashPassword = (plainPassword, saltParam, saltRounds) => {
    const salt = saltParam || Math.random().toString(36).substr(2, 20);
    let hashedPassword = plainPassword;
    for (let i = 0; i < saltRounds; i++) {
        hashedPassword = btoa(plainPassword + salt);
    }
    return `$${btoa(salt)}$${saltRounds}$${hashedPassword}`;
}

const comparePassword = (plainPassword, hashedPassword) => {
    const [_, salt, saltRounds, hash] = hashedPassword.split("$");
    return hashPassword(plainPassword, atob(salt), saltRounds) === hashedPassword;
}

export function addUser(username, password) {
    return new Promise((resolve, reject) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = {
            username: username,
            password: hashPassword(password, null, 10)
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        resolve({
            status: 201
        });
    });
}

export function login(username, password) {
    return new Promise((resolve, reject) => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        let user = storedUsers.find(user => user.username === username);

        if (user && comparePassword(password, user.password)) {
            localStorage.setItem('access_token', username);
            resolve({
                status: 200
            })
        } else {
            localStorage.removeItem('access_token', username);
            resolve({
                status: 401
            })
        }
    });
}

export function isLoggedIn() {
    const token = localStorage.getItem('access_token');
    if (token) {
        return true;
    } else {
        return false;
    }
}

export function logout() {
    localStorage.removeItem('access_token');
    return window.location.href = process.env.PUBLIC_URL;
}

export function getUser() {
    const username = localStorage.getItem('access_token');
    return username;
}

