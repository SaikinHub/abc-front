import { useEffect, useState } from 'react';
import Table from '../../../../components/shared/Table';
import {
    subjectsHeadingsList,
    subjectsList,
} from '../../../../constants/constants';
import { getAllSubjects } from '../../../../lib/actions/subject.actions';

const EditSubject = () => {
    const [subjects, setSubjects] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            const result = await getAllSubjects();
            setSubjects(result.subjects);
        };
        fetch();
    }, []);
    return (
        <section className="edit__wrapper">
            <h2>List of all Subjects</h2>
            <Table
                type="subject"
                headings={subjectsHeadingsList}
                list={subjects}
            />
        </section>
    );
};

export default EditSubject;
