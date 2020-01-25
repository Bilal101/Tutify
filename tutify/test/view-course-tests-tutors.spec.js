import React from "react";
import MyCourses, { MyCourses as MyCoursesClass } from "../src/components/CourseView/MyCourses";
import ViewCourse, { ViewCourse as ViewCourseClass } from "../src/components/CourseView/ViewCourse";
import ContactTutor from "../src/components/StudentCourseView/ContactTutor";
import Documents from "../src/components/StudentCourseView/Documents";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

describe('The Students Courses Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the specific student courses for Students. Checking if all of the required information for specfic student course page exists on the page.', () => {
        // All the mounting and state setting
        
        const mockedStudent =  [
            {
              _id: {
                "$oid": "5e02882c641f2eac8f2837b0"
              },
              course: {
                name: "COMP 472",
                description : "Automated reasoning. Search and heuristic search. Game‑playing.",
              },
              tutor: {
                first_name: "Mohammed",
                last_name : "Alawami"
              },
              files:
              [ 
                { uploadedDocs: [],
                    sharedToStudents: [Array],
                  sharedToCourses: [Array],
                  _id: '5e28c316259be07f5a788b09',
                  __v: 0,
                  adminTutor: '5dacd1cf1c9d440000aa0b1b',
                  encryptedname: 'b0c16d9323dbf1438f595fc94ef219d5.jpg',
                  link: '/document/b0c16d9323dbf1438f595fc94ef219d5.jpg',
                  name: 'galaxyBackground.jpg',
                  uploadDate: '2020-01-22T21:48:06.561Z' 
                } 
              ]
            }
          ]
         
        // Go to next page which contains information about a particular course the student is registered in.
        const wrapper_shallow_specific_course = shallow(<ViewCourse files={mockedStudent[0].files}></ViewCourse>);
        const wrapper_specific_course = mount(<ViewCourse files={mockedStudent[0].files}></ViewCourse>);
        const student_class_wrapper = wrapper_specific_course.find(ViewCourseClass);
        student_class_wrapper.setState({ files :mockedStudent[0].files,
                                         course_selected : mockedStudent[0].course.name,
                                         profileType: "tutor"})

        /**
         * Specific Course Page
        */
        
        // Finding the Grid component containing the Different classes student is registered for.
        const test = wrapper_shallow_specific_course.dive().find(Grid).at(0);
        // Seeing if the Grid components Exists (import grid)
        expect(test.exists()).toBeTruthy();

        // Finding the Typography component that contains the title for the Course Documents component.
        const course_title2 = wrapper_shallow_specific_course.dive().find(Typography).at(1);
        // Make sure the specific student course page contains tutor Course Documents header on it.
        expect(course_title2.props().children).toBe("Course Documents");

        // Getting the Card that contains information about the course.
        const course_title3 =  wrapper_specific_course.find(Typography).at(3);
        // Make sure the specific student course page contains tutor Course Documents header on it.
        expect(course_title3.props().children).toBe("COMP 472");

        // Getting the Card that contains information about the course.
        const course_title4 =  wrapper_specific_course.find(TableRow).at(0);
        console.log(course_title4.props().children[0].props.children);
        // Make sure the specific student course page contains tutor Course Documents header on it.
        expect(course_title4.props().children[0].props.children).toBe("Title");
        // Make sure the specific student course page contains tutor Course Documents header on it.
        expect(course_title4.props().children[1].props.children).toBe("Date");
        // Make sure the specific student course page contains tutor Course Documents header on it.
        expect(course_title4.props().children[2].props.children).toBe("Download Documents");
        expect(course_title4.props().children[3].props.children).toBe("Select Documents to Delete");

        const course_title5 =  wrapper_specific_course.find(TableRow).at(1);
        console.log(course_title5.props().children[0].props.children);
        console.log(course_title5.props().children[1].props.children);
        console.log(course_title5.props().children[2].props.children.props.children.type.displayName);
        console.log(course_title5.props().children[3].props.children.props);
        console.log(course_title5.props().children[3].props.children.props);
    
    });
}); 