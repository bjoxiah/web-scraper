import { check } from "express-validator";

export const postData = [
    check('link')
        .isURL()
        //.matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
        .withMessage('Provide a valid link to an article'),
    check('newspaper')
        .not().isEmpty()
        .withMessage('Select a newspaper')
    ];