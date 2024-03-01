export async function getAllSubjects() {
    try {
        const subjects = await fetch(
            'http://localhost:3005/courses/getAllSubjects'
        ).then((res) => res.json());
        return { subjects };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
