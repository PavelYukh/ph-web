import {createRouter, createWebHistory} from 'vue-router'
import Schedule from '../components/Schedule/Schedule.vue'
import ScheduleCreate from '../components/Schedule/ScheduleCreate.vue'
import Schedules from '../components/Schedule/Schedules.vue'
import Teachers from '../components/Teacher/Teachers.vue'
import TeacherCreate from '../components/Teacher/TeacherCreate.vue'
import SingleTeacher from '../components/Teacher/SingleTeacher.vue'
import SingleSchedule from '../components/Schedule/SingleSchedule.vue'
import SingleGroup from '../components/Group/SingleGroup.vue'
import Groups from '../components/Group/Groups.vue';
import GroupCreate from '../components/Group/GroupCreate.vue';
import Disciplines from '../components/Discipline/Disciplines.vue';
import AllSelect from '../components/global/AllSelect.vue';
import SingleDiscipline from '../components/Discipline/SingleDiscipline.vue';
import DisciplineCreate from '../components/Discipline/DisciplineCreate.vue';
import Students from '../components/Student/Students.vue';
import StudentCreate from '../components/Student/StudentCreate.vue';
import SingleStudent from '../components/Student/SingleStudent.vue';
import SingleDepartment from '../components/Department/SingleDepartment.vue';
import Departments from '../components/Department/Departments.vue';
import DepartmentCreate from '../components/Department/DepartmentCreate.vue';
import Faculties from '../components/Faculty/Faculties.vue';
import FacultyCreate from '../components/Faculty/FacultyCreate.vue';
import SingleFaculty from '../components/Faculty/SingleFaculty.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/navigation',
            name: 'nav',
            component: AllSelect
        },
        {
            path: '/',
            name: 'home',
            component: Schedule
        },
        {
            path: '/students',
            name: 'students',
            component: Students
        }, {
            path: '/faculties',
            name: 'faculties',
            component: Faculties
        },
        {
            path: '/teachers',
            name: 'teachers',
            component: Teachers
        }, {
            path: '/groups',
            name: 'groups',
            component: Groups
        }, {
            path: '/disciplines',
            name: 'disciplines',
            component: Disciplines
        }, {
            path: '/departments',
            name: 'departments',
            component: Departments
        }, {
            path: '/schedules',
            name: 'schedules',
            component: Schedules
        },
        {
            path: '/teachers/:id',
            name: 'teacher',
            component: SingleTeacher
        }, {
            path: '/departments/:id',
            name: 'department',
            component: SingleDepartment
        },
        {
            path: '/students/:id',
            name: 'student',
            component: SingleStudent
        }, {
            path: '/disciplines/:id',
            name: 'discipline',
            component: SingleDiscipline
        }, {
            path: '/groups/:id',
            name: 'group',
            component: SingleGroup
        }, {
            path: '/schedules/:id',
            name: 'schedule',
            component: SingleSchedule
        }, {
            path: '/faculties/:id',
            name: 'faculty',
            component: SingleFaculty
        },
        {
            path:'/departments-create',
            name:'createDepartment',
            component:DepartmentCreate
        }, {
            path:'/disciplines-create',
            name:'createDiscipline',
            component:DisciplineCreate
        }, {
            path:'/faculties-create',
            name:'createFaculty',
            component:FacultyCreate
        }, {
            path:'/groups-create',
            name:'createGroup',
            component:GroupCreate
        }, {
            path:'/schedules-create',
            name:'createSchedule',
            component:ScheduleCreate
        },{
            path:'/teachers-create',
            name:'createTeacher',
            component:TeacherCreate
        },{
            path:'/students-create',
            name:'createStudent',
            component:StudentCreate
        },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import('../views/AboutView.vue')
        // }
    ]
})

export default router
