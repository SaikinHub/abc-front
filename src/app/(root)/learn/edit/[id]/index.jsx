import { useParams } from 'react-router-dom';
import EditContent from '../../../../../components/forms/EditContent';
import { Editor } from '../../../../../components/forms/RichTextEditor';
import {
    getCourseById,
    updateCourseContent,
} from '../../../../../lib/actions/course.actions';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditSubject = () => {
    const params = useParams();
    const [course, setCourse] = useState(null);
    const [contentChanges, setContentChanges] = useState(null);
    const [send, setSend] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const result = await getCourseById(params.id);
            setCourse(result[0]);
        };
        fetch();
    }, []);

    useEffect(() => {
        if (contentChanges && send) {
            const post = async () => {
                const payload = {
                    id: params.id,
                    content: contentChanges,
                };
                return await updateCourseContent(payload);
            };

            const postPromise = post();

            toast.promise(postPromise, {
                loading: 'Saving...',
                success: 'Saved !',
                error: 'Something went wrong !',
            });
            setSend(false);
            setContentChanges(null);
        }
    }, [send]);

    const handleOnChange = (data) => {
        setContentChanges(data);
    };

    const handleApplyChanges = () => {
        setSend(true);
    };

    return (
        <section className="edit__section">
            {course && (
                <>
                    <div className="edit__wrapper">
                        <h2>Edit Course : {course.name}</h2>
                        <EditContent
                            editable={false}
                            action="update"
                            type="course"
                            initialContent={course}
                        />
                    </div>
                    {contentChanges && (
                        <>
                            <p>New changes to the course content...</p>
                            <button
                                className="btn edit__apply-changes-btn"
                                onClick={() => handleApplyChanges()}
                            >
                                Apply changes
                            </button>
                        </>
                    )}
                    <Editor
                        editable={true}
                        onChange={handleOnChange}
                        initialContent={course.content}
                    />
                </>
            )}
        </section>
    );
};

export default EditSubject;
