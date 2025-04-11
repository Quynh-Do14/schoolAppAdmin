import { ROUTE_PATH } from "../../core/common/appRouter";

import ManageLayout from "../common/Layouts/Manage-Layout";
import ListCourseManagement from "../../pages/Manage/course-management/list";
import AddCourseManagement from "../../pages/Manage/course-management/add";
import ViewCourseManagement from "../../pages/Manage/course-management/view";
import LoginPage from "../../pages/Auth/Login";
import ListUserManagement from "../../pages/Manage/user-management/list";
import ViewUserManagement from "../../pages/Manage/user-management/view";
import AddUserManagement from "../../pages/Manage/user-management/add";
import ListCategoryManagement from "../../pages/Manage/major-management/list";
import AddCategoryManagement from "../../pages/Manage/major-management/add";
import ViewCategoryManagement from "../../pages/Manage/major-management/view";
import ListDepartmentManagement from "../../pages/Manage/department-management/list";
import AddDepartmentManagement from "../../pages/Manage/department-management/add";
import ViewDepartmentManagement from "../../pages/Manage/department-management/view";
import ListRoleManagement from "../../pages/Manage/role-management/list";
import AddRoleManagement from "../../pages/Manage/role-management/add";
import ViewRoleManagement from "../../pages/Manage/role-management/view";
import ListTeacherManagement from "../../pages/Manage/teacher-management/list";
import AddTeacherManagement from "../../pages/Manage/teacher-management/add";
import ViewTeacherManagement from "../../pages/Manage/teacher-management/view";
import ListExamManagement from "../../pages/Manage/exam/list";
import AddExamxManagement from "../../pages/Manage/exam/add";
import ViewExamManagement from "../../pages/Manage/exam/view";
import ListCourseClassManagement from "../../pages/Manage/courseClass-management/list";
import AddCourseClassManagement from "../../pages/Manage/courseClass-management/add";
import ViewCourseClassManagement from "../../pages/Manage/courseClass-management/view";
import ListScheduleManagement from "../../pages/Manage/schedule-management/list";
import AddScheduleManagement from "../../pages/Manage/schedule-management/add";
import ViewScheduleManagement from "../../pages/Manage/schedule-management/view";
import ListStudentOfCourseClassManagement from "../../pages/Manage/courseClass-management/listStudent";

export const privateRoutes = [
    {
        path: ROUTE_PATH.HOME_PAGE,
        component: LoginPage,
        private: false,
    },
    {
        path: ROUTE_PATH.MANAGE_LAYOUT,
        component: ManageLayout,
        private: false,
    },
    {
        path: ROUTE_PATH.ROLE_MANAGEMENT,
        component: ListRoleManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.ADD_ROLE_MANAGEMENT,
        component: AddRoleManagement,
        private: false,
    },

    {
        path: ROUTE_PATH.VIEW_ROLE_MANAGEMENT,
        component: ViewRoleManagement,
        private: false,
    },

    {
        path: ROUTE_PATH.DEPARTMENT_MANAGEMENT,
        component: ListDepartmentManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.ADD_DEPARTMENT_MANAGEMENT,
        component: AddDepartmentManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.VIEW_DEPARTMENT_MANAGEMENT,
        component: ViewDepartmentManagement,
        private: false,
    },

    {
        path: ROUTE_PATH.MAJOR_MANAGEMENT,
        component: ListCategoryManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.ADD_MAJOR_MANAGEMENT,
        component: AddCategoryManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.VIEW_MAJOR_MANAGEMENT,
        component: ViewCategoryManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.COURSE_MANAGEMENT,
        component: ListCourseManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.ADD_COURSE_MANAGEMENT,
        component: AddCourseManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.VIEW_COURSE_MANAGEMENT,
        component: ViewCourseManagement,
        private: false,
    },

    {
        path: ROUTE_PATH.TEACHER_MANAGEMENT,
        component: ListTeacherManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.ADD_TEACHER_MANAGEMENT,
        component: AddTeacherManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.VIEW_TEACHER_MANAGEMENT,
        component: ViewTeacherManagement,
        private: false,
    },

    {
        path: ROUTE_PATH.STUDENT_MANAGEMENT,
        component: ListUserManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.ADD_STUDENT_MANAGEMENT,
        component: AddUserManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.VIEW_STUDENT_MANAGEMENT,
        component: ViewUserManagement,
        private: false,
    },

    {
        path: ROUTE_PATH.COURSE_CLASS_MANAGEMENT,
        component: ListCourseClassManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.ADD_COURSE_CLASS_MANAGEMENT,
        component: AddCourseClassManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.VIEW_COURSE_CLASS_MANAGEMENT,
        component: ViewCourseClassManagement,
        private: false,
    },

    {
        path: ROUTE_PATH.STUDENT_OF_COURSE_CLASS_MANAGEMENT,
        component: ListStudentOfCourseClassManagement,
        private: false,
    },

    {
        path: ROUTE_PATH.EXAM_MANAGEMENT,
        component: ListExamManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.ADD_EXAM_MANAGEMENT,
        component: AddExamxManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.VIEW_EXAM_MANAGEMENT,
        component: ViewExamManagement,
        private: false,
    },

    {
        path: ROUTE_PATH.SCHEDULE_MANAGEMENT,
        component: ListScheduleManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.ADD_SCHEDULE_MANAGEMENT,
        component: AddScheduleManagement,
        private: false,
    },
    {
        path: ROUTE_PATH.VIEW_SCHEDULE_MANAGEMENT,
        component: ViewScheduleManagement,
        private: false,
    },
]