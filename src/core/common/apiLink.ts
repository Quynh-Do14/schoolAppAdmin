export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "/auth/signup"
        static Profile = "/students/me"
        static ProfileUpdate = "/profile/update"
        static Customer = "/customers/update"
        static ChangePassword = "/profile/change-password"
        static MyCourse = "/course_user/my-courses"
    }
    static Course = class {
        static Get = "/v1/courses"
        static GetById = "/v1/courses"
        static Add = "/v1/courses"
        static Update = "/v1/courses"
        static Delete = "/v1/courses"
    }
    static Role = class {
        static Get = "/roles"
        static Add = "/roles"
        static Update = "/roles"
        static Delete = "/roles"
    }

    static Majors = class {
        static Get = "/majors"
        static Add = "/majors"
        static Update = "/majors"
        static Delete = "/majors"
    }

    static Department = class {
        static Get = "/departments"
        static Add = "/departments"
        static Update = "/departments"
        static Delete = "/departments"
    }

    static User = class {
        static Get = "/students"
        static GetById = "/students"
        static Add = "/auth/register"
        static Update = "/studentsadmin"
        static Delete = "/auth/delete"
    }

    static Teacher = class {
        static Get = "/lectures"
        static GetById = "/lectures"
        static Add = "/auth/register"
        static Update = "/lectures"
        static Delete = "/lectures"
    }

    static CourseClass = class {
        static Get = "/v1/courseClass/userId"
        static GetPublic = "/v1/courseClass/userId"
        static Add = "/v1/courseClass"
        static Update = "/v1/courseClass"
        static Delete = "/v1/courseClass"
        static Student = "/v1/enrollment/class"
    }

    static Exam = class {
        static Get = "/v1/exams"
        static Add = "/v1/exams"
        static Update = "/v1/exams"
        static Delete = "/v1/exams"
    }
    static Schedule = class {
        static Get = "/v1/schedules"
        static Add = "/v1/schedules"
        static Update = "/v1/schedules"
        static Delete = "/v1/schedules"
    }

    static Grade = class {
        static Get = "/v1/grades"
        static Add = "/v1/grades"
        static Update = "/v1/grades"
        static Delete = "/v1/grades"
    }

    static Registration = class {
        static registration = "/registration"
    }
    static TimeTable = class {
        static timeTable = "/timetable"
    }
}