const PREFIX = "";

export const ROUTE_PATH = {

    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    ///Client
    HOME_PAGE: `${PREFIX}/`,
    LIST_COURSE: `${PREFIX}/course-public`,
    DETAIL_COURSE: `${PREFIX}/course-public/view/:id`,
    LIST_TEACHER: `${PREFIX}/teacher-public`,
    DETAIL_TEACHER: `${PREFIX}/teacher-public/view/:id`,

    LIST_LESSON: `${PREFIX}/lesson-public`,
    DETAIL_LESSON: `${PREFIX}/lesson-public/view/:id`,

    LIST_DOCUMENT: `${PREFIX}/document-public`,
    DETAIL_DOCUMENT: `${PREFIX}/document-public/view/:id`,

    ///Management
    MANAGE_LAYOUT: `${PREFIX}/manage-layout`,

    ROLE_MANAGEMENT: `${PREFIX}/role`,
    ADD_ROLE_MANAGEMENT: `${PREFIX}/role/add`,
    VIEW_ROLE_MANAGEMENT: `${PREFIX}/role/view/:id`,

    DEPARTMENT_MANAGEMENT: `${PREFIX}/department`,
    ADD_DEPARTMENT_MANAGEMENT: `${PREFIX}/department/add`,
    VIEW_DEPARTMENT_MANAGEMENT: `${PREFIX}/department/view/:id`,

    MAJOR_MANAGEMENT: `${PREFIX}/major`,
    ADD_MAJOR_MANAGEMENT: `${PREFIX}/major/add`,
    VIEW_MAJOR_MANAGEMENT: `${PREFIX}/major/view/:id`,

    COURSE_MANAGEMENT: `${PREFIX}/course`,
    ADD_COURSE_MANAGEMENT: `${PREFIX}/course/add`,
    VIEW_COURSE_MANAGEMENT: `${PREFIX}/course/view/:id`,

    STUDENT_MANAGEMENT: `${PREFIX}/student`,
    ADD_STUDENT_MANAGEMENT: `${PREFIX}/student/add`,
    VIEW_STUDENT_MANAGEMENT: `${PREFIX}/student/view/:id`,

    TEACHER_MANAGEMENT: `${PREFIX}/teacher`,
    ADD_TEACHER_MANAGEMENT: `${PREFIX}/teacher/add`,
    VIEW_TEACHER_MANAGEMENT: `${PREFIX}/teacher/view/:id`,

    LESSON_MANAGEMENT: `${PREFIX}/lesson`,
    ADD_LESSON_MANAGEMENT: `${PREFIX}/lesson/add`,
    VIEW_LESSON_MANAGEMENT: `${PREFIX}/lesson/view/:id`,

    SCHEDULE_MANAGEMENT: `${PREFIX}/schedule`,
    ADD_SCHEDULE_MANAGEMENT: `${PREFIX}/schedule/add`,
    VIEW_SCHEDULE_MANAGEMENT: `${PREFIX}/schedule/view/:id`,

    EXAM_MANAGEMENT: `${PREFIX}/exam`,
    ADD_EXAM_MANAGEMENT: `${PREFIX}/exam/add`,
    VIEW_EXAM_MANAGEMENT: `${PREFIX}/exam/view/:id`,

    BANNER_MANAGEMENT: `${PREFIX}/banner`,
    ADD_BANNER_MANAGEMENT: `${PREFIX}/banner/add`,
    VIEW_BANNER_MANAGEMENT: `${PREFIX}/banner/view/:id`,
}