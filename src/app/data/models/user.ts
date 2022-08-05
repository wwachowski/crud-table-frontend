export interface User {
    id: number,
    name: string,
    email: string,
    status: 'blocked' | 'active',
    lastLogin: Date | null,
    registrationTime: Date,
    checked?: boolean
}

export interface UnparsedUser {
    id: number,
    name: string,
    email: string,
    status: 'blocked' | 'active',
    last_login: Date,
    registration_time: Date
}