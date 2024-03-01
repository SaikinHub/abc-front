import { useParams } from 'react-router-dom';
import EditContent from '../../../../../components/forms/EditContent';
import Table from '../../../../../components/shared/Table';
import {
    coursesHeadingsList,
    playList,
} from '../../../../../constants/constants';
import { useEffect, useState } from 'react';
import {
    getCoursesBySubjectId,
    getSubjectById,
} from '../../../../../lib/actions/course.actions';

const EditSubject = () => {
    const params = useParams();
    const [media, setMedia] = useState(null);
    const [relatedCourses, setRelatedCourses] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            const result1 = await getSubjectById(params.id);
            setMedia(result1.subject);

            const result2 = await getCoursesBySubjectId(params.id);
            setRelatedCourses(result2.courses);
        };
        fetch();
    }, []);
    // const media = {
    //     posterURL: '/assets/images/default-image1.jpg',
    //     name: 'Big Ben',
    //     metaTags: ['A Class', 'B Class'],
    //     id: '4',
    //     createdAt: '29/02/2024',
    //     subject: 'English',
    //     description:
    //         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    //     metrics: [
    //         { number: 3, title: 'Seasons' },
    //         { number: 46, title: 'Episodes' },
    //         { number: 52, title: 'Extra Episodes' },
    //         { number: 12, title: 'Activities' },
    //         { number: 8, title: 'Extra Ressources' },
    //     ],
    // };
    return (
        <section>
            {media && (
                <div className="edit__wrapper">
                    <h2>Edit Subject : {media.name}</h2>

                    <div>
                        <EditContent
                            media={media}
                            type="subject"
                            action="update"
                            initialContent={media}
                        />
                    </div>
                    <div className="edit__course-table-wrapper">
                        <Table
                            type="learn"
                            headings={coursesHeadingsList}
                            list={relatedCourses}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default EditSubject;
