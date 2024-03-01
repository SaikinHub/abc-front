import { useEffect, useState } from 'react';
import { Editor } from '../../../../components/forms/RichTextEditor';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../../../lib/actions/course.actions';

const Learn = () => {
    const params = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const result = await getCourseById(params.id);
            setContent(result[0].content);
        };
        fetch();
    }, []);
    return (
        <div>
            {content && <Editor editable={false} initialContent={content} />}
        </div>
    );
};

export default Learn;
