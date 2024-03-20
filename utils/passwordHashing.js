import { hash, compare } from 'bcrypt';

export async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
}

export async function comparePasswords(plainPassword, hashedPassword) {
    return await compare(plainPassword, hashedPassword);
}