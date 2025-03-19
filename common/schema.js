import zod from "zod";

export const signupSchema = zod.object({
    name: zod.string().min(8).max(30),
    email: zod.string().email(),
    password: zod.string().min(8).max(30)
});


module.exports = {
    signupSchema
};
