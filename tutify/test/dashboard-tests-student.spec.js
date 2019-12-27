import React from "react";
import StudentList, { StudentList as StudentListClass } from "../src/components/TutorProfile/StudentList";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Title from "../src/components/TutorProfile/Title";
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

describe('The Tutors List of Students Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the update courses for Students. Updating one of the values present in the Dialog Box (education level of student)', () => {
        // All the mounting and state setting
        const wrapper = mount(<StudentList></StudentList>);
        const wrapper_shallow = shallow(<StudentList></StudentList>);
        const student_class_wrapper = wrapper.find(StudentListClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Checking the List of Students Page for Tutors and see if all elements are present  
        */

        // Finding the Typography component  that contains the Main Title Header Present on the Page.
        const list_of_students_page = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name on the tutor page is List of Students
        expect(list_of_students_page.props().children).toBe("List of Students");

        // Finding the Title component  that contains the Table Title Students
        const students_title_table = wrapper_shallow.dive().find(Title).at(0);
        // Make sure the header name for the student page page is Students
        expect(students_title_table.props().children).toBe("Students");

        // Finding the Table component 
        const table_component= wrapper_shallow.dive().find(Table).at(0);
        // Check if Table component exists
        expect(table_component.exists()).toBeTruthy();

        // Finding the TableRow component  (row of the table)
        const table_row_component = wrapper_shallow.dive().find(TableRow).at(0);
        // Check if TableRow component exists
        expect(table_row_component.exists()).toBeTruthy();

        // Finding the TableCell component  (column of the table). 1st column of table is taken here.
        const firstname_column = wrapper_shallow.dive().find(TableCell).at(0);
        // Make sure the name of the first Table cell column exists and has the value "First Name"
        expect(firstname_column.props().children).toBe("First Name");

        // Finding the TableCell component  (column of the table). 2nd column of table is taken here.
        const lastname_column = wrapper_shallow.dive().find(TableCell).at(1);
        // Make sure the name of the second Table cell column exists and has the value "Last Name"
        expect(lastname_column.props().children).toBe("Last Name");

        // Finding the TableCell component  (column of the table). 3rd column of table is taken here.
        const program_column = wrapper_shallow.dive().find(TableCell).at(2);
        // Make sure the name of the third Table cell column exists and has the value "Program"
        expect(program_column.props().children).toBe("Program");

        // Finding the TableCell component  (column of the table). 4th column of table is taken here.
        const school_column = wrapper_shallow.dive().find(TableCell).at(3);
        // Make sure the name of the third Table cell column exists and has the value "School"
        expect(school_column.props().children).toBe("School");

        // Finding the TableCell component  (column of the table). 5th column of table is taken here.
        const leveleducation_column = wrapper_shallow.dive().find(TableCell).at(4);
        // Make sure the name of the fourth Table cell column exists and has the value "Level of Education"
        expect(leveleducation_column.props().children).toBe("Level of Education");

        // Finding the Link component. 
        const course_title1111111 = wrapper_shallow.dive().find(Link).at(0);
        // Make sure there exists a component at the end of the table that has "See More" value attached to it.
        expect(course_title1111111.props().children).toBe("See more");

    });
}); 