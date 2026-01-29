export const Role = {
    admin: "ADMIN",
    student: "STUDENT",
    tutor: "TUTOR"
}
export type RoleType = typeof Role[keyof typeof Role];