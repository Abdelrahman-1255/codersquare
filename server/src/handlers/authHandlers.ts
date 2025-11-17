import { ExpressHandler } from "../types";
import { SignUpRequest, SignUpResponse, SignInRequest, SignInResponse } from "../api";
import { db } from "../datastore";
import crypto from "crypto";
import bcrypt from  'bcrypt';
import { signJwt } from "../auth";

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
        res.status(400).send({ error: 'Invalid sign up data' });
        return;
    }
    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(username);
    if (existing) {
        res.status(409).send({ error: 'User with given email or username already exists' });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
    const newUser = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword
    }
    await db.createUser(
        newUser
    );
    const jwt = signJwt({ userId: newUser.id, role: "user" });
    res.status(201).send({ jwt });
}

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        res.status(400).send({ error: 'Invalid sign in data' });
        return;
    }
    const user = await db.getUserByEmail(login) || await db.getUserByUsername(login);
    if (!user) {
        res.status(401).send({ error: 'Invalid login or password' });
        return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).send({ error: 'Invalid login or password' });
        return;
    }
    const jwt = signJwt({ userId: user.id, role: "user" });
    res.send({
        user:{
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
        },
        jwt
    });
}