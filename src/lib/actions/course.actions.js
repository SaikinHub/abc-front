import { courseDefaultContent } from '../../constants/constants';

// CREATE - C
export async function createCourse({
    name,
    description,
    content,
    posterUrl,
    subjectId,
}) {
    try {
        const payload = {
            name: name,
            description: description,
            content:
                JSON.stringify(content) ?? JSON.stringify(courseDefaultContent),
            posterUrl: posterUrl,
            subjectId: parseInt(subjectId),
        };
        const token = localStorage.getItem('token');
        if (token) {
            return await fetch('http://localhost:3005/courses/createCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + JSON.parse(token),
                },
                body: JSON.stringify(payload),
            });
        }
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function setSubjectInfos({ name, description, posterUrl }) {
    try {
        const payload = {
            name: name,
            description: description,
            genre: 1,
            posterUrl: posterUrl,
        };
        const token = localStorage.getItem('token');
        if (token) {
            return await fetch('http://localhost:3005/courses/createSubject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + JSON.parse(token),
                },
                body: JSON.stringify(payload),
            });
        }
        return false;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// READ - R
export async function getSubjectById(id) {
    try {
        const payload = {
            id: id,
        };
        const subject = await fetch(
            'http://localhost:3005/courses/getSubjectById',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        ).then((res) => res.json());
        return { subject };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCoursesBySubjectId(id) {
    try {
        const payload = {
            id: id,
        };
        const courses = await fetch(
            'http://localhost:3005/courses/getCoursesBySubjectId',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        ).then((res) => res.json());
        return { courses };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCourseById(id) {
    try {
        const payload = {
            id: id,
        };
        const course = await fetch(
            'http://localhost:3005/courses/getCourseById',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        ).then((res) => res.json());
        return course;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// UPDATE - U
export async function updateSubjectInfos({ id, name, description, posterUrl }) {
    try {
        const payload = {
            id: parseInt(id),
            name: name,
            description: description,
            poster: posterUrl,
            genre: 1,
        };
        const token = localStorage.getItem('token');
        if (token) {
            return await fetch('http://localhost:3005/courses/updateSubject', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + JSON.parse(token),
                },
                body: JSON.stringify(payload),
            });
        }
        return false;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateCourse({
    id,
    name,
    description,
    content,
    posterUrl,
    subjectId,
}) {
    try {
        const payload = {
            id: parseInt(id),
            name: name,
            description: description,
            posterUrl: posterUrl,
            subjectId: subjectId,
        };
        if (content) payload.content = content;

        const token = localStorage.getItem('token');

        return await fetch('http://localhost:3005/courses/updateCourse', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(token),
            },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateCourseContent({ id, content }) {
    try {
        if (id && content) {
            const payload = {
                id: parseInt(id),
                content: content,
            };

            const token = localStorage.getItem('token');

            return await fetch(
                'http://localhost:3005/courses/updateCourseContent',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + JSON.parse(token),
                    },
                    body: JSON.stringify(payload),
                }
            );
        } else {
            console.error('Bad Request');
            throw 'Bad Request';
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// DELETE - D
export async function deleteCourseById(id) {
    try {
        if (!isNaN(parseInt(id))) {
            const token = localStorage.getItem('token');

            await fetch(`http://localhost:3005/courses/deleteCourse/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + JSON.parse(token),
                },
            });
            return true;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteSubjectById(id) {
    try {
        if (!isNaN(parseInt(id))) {
            const token = localStorage.getItem('token');

            await fetch(`http://localhost:3005/courses/deleteSubject/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + JSON.parse(token),
                },
            });
            return true;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
