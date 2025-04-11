import { CalendarOutlined, ContainerOutlined, DatabaseOutlined, EnvironmentOutlined, MessageOutlined, ProjectOutlined, ScheduleOutlined, TableOutlined, TagOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "./appRouter";

export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Quản lý ngành",
                link: ROUTE_PATH.DEPARTMENT_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý chuyên ngành",
                link: ROUTE_PATH.MAJOR_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý phân quyền",
                link: ROUTE_PATH.ROLE_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý môn học",
                link: ROUTE_PATH.COURSE_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý lớp học phần",
                link: ROUTE_PATH.COURSE_CLASS_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý lịch học",
                link: ROUTE_PATH.SCHEDULE_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý lịch thi",
                link: ROUTE_PATH.EXAM_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý giáo viên",
                link: ROUTE_PATH.TEACHER_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý sinh viên",
                link: ROUTE_PATH.STUDENT_MANAGEMENT,
                icon: UserOutlined
            },
        ]
    };
    static MenuClient = class {
        static List = [
            {
                label: "Trang chủ",
                link: ROUTE_PATH.HOME_PAGE,
            },
            {
                label: "Khóa học",
                link: ROUTE_PATH.LIST_COURSE,
            },
            {
                label: "Giáo viên",
                link: ROUTE_PATH.LIST_TEACHER,
            },
            {
                label: "Bài giảng",
                link: ROUTE_PATH.LIST_LESSON,
            }
        ]
    };
    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static search = "search";
        static idDanhMuc = "idDanhMuc";
        static parentId = "parentId"
    }

    static PaginationClientConfigs = class {
        static Size = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "8", value: 8 },
            { label: "16", value: 16 },
            { label: "48", value: 48 },
        ]
    };

    static PaginationConfigs = class {
        static Size = 10;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };

    static UseParams = class {
        static Id = ":id"
    }

    static TabInfoTeacher = class {
        static List = [
            { label: "", value: 1 },
            { label: "", value: 2 },
            { label: "", value: 3 },
        ]
    }

    static Gender = class {
        static MALE = class {
            static value = true;
            static label = "Nam";
            static position = "Thầy";
        }
        static FEMALE = class {
            static value = false;
            static label = "Nữ";
            static position = "Cô";
        }
        static List = [
            { label: "Nam", value: "Male" },
            { label: "Nữ", value: "Female" },
        ]
    }
    static Role = class {
        static List = [
            { label: "Admin", value: "Admin" },
            { label: "Giáo viên", value: "teacher" },
            { label: "Sinh viên", value: "student" },
        ]
    }
    static ConfigSelect = class {
        static Academic = class {
            static List = [
                {
                    label: "2021 - 2022",
                    value: "2021 - 2022"
                },
                {
                    label: "2022 - 2023",
                    value: "2022 - 2023"
                },
                {
                    label: "2023 - 2024",
                    value: "2023 - 2024"
                },
                {
                    label: "2024 - 2025",
                    value: "2024 - 2025"
                },
            ]
        }
        static Semester = class {
            static List = [
                {
                    label: "Học kì 1",
                    value: "Học kì 1"
                },
                {
                    label: "Học kì 2",
                    value: "Học kì 2"
                },
                {
                    label: "Học kì 3",
                    value: "Học kì 3"
                },
            ]
        }
        static DayOfWeek = class {
            static List = [
                { label: "Thứ 2", value: "MONDAY" },
                { label: "Thứ 3", value: "TUESDAY" },
                { label: "Thứ 4", value: "WEDNESDAY" },
                { label: "Thứ 5", value: "THURSDAY" },
                { label: "Thứ 6", value: "FRIDAY" },
                { label: "Thứ 7", value: "SATURDAY" },
            ];
        }
        static Room = class {
            static List = [
                { "label": "A 101", "value": "A 101" },
                { "label": "A 102", "value": "A 102" },
                { "label": "A 103", "value": "A 103" },
                { "label": "A 104", "value": "A 104" },
                { "label": "A 105", "value": "A 105" },
                { "label": "A 106", "value": "A 106" },
                { "label": "A 107", "value": "A 107" },
                { "label": "A 108", "value": "A 108" },
                { "label": "A 109", "value": "A 109" },
                { "label": "A 110", "value": "A 110" },
                { "label": "B 101", "value": "B 101" },
                { "label": "B 102", "value": "B 102" },
                { "label": "B 103", "value": "B 103" },
                { "label": "B 104", "value": "B 104" },
                { "label": "B 105", "value": "B 105" },
                { "label": "B 106", "value": "B 106" },
                { "label": "B 107", "value": "B 107" },
                { "label": "B 108", "value": "B 108" },
                { "label": "B 109", "value": "B 109" },
                { "label": "B 110", "value": "B 110" },
            ]
        }
        static Period = class {
            static List = [
                { label: "Tiết 1", value: 1 },
                { label: "Tiết 2", value: 2 },
                { label: "Tiết 3", value: 3 },
                { label: "Tiết 4", value: 4 },
                { label: "Tiết 5", value: 5 },
                { label: "Tiết 6", value: 6 },
                { label: "Tiết 7", value: 7 },
                { label: "Tiết 8", value: 8 },
                { label: "Tiết 9", value: 9 },
                { label: "Tiết 10", value: 10 },
            ]
        }
    }
};