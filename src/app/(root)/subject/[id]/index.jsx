import { useParams } from 'react-router-dom';
import PlayableCard from '../../../../components/cards/PlayableCard';
import { useEffect, useState } from 'react';
import { getCoursesBySubjectId } from '../../../../lib/actions/course.actions';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../../../../lib/utils/globalState/coursesSlice';

const Subject = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { globalStateCoursesArr } = useSelector((state) => state.courses); // Global state
    const [coursesList, setCoursesList] = useState([]);

    useEffect(() => {
        const fetchAndDispatch = async (sessionCourses) => {
            await getCoursesBySubjectId(params.id).then((result) => {
                const payload = {
                    subjectId: params.id,
                    coursesList: result.courses,
                };
                dispatch(setCourses(payload));
                setCoursesList(result.courses);
                const coursesToStore = sessionCourses
                    ? JSON.stringify([...sessionCourses, payload])
                    : JSON.stringify([payload]);

                sessionStorage.setItem('coursesArr', coursesToStore);
            });
        };

        // Vérifier si les cours cibles existent dans le global state
        const targetSubjectCourses = globalStateCoursesArr.find(
            (course) => course.subjectId === params.id
        )?.coursesList;

        if (!targetSubjectCourses) {
            console.log('Pas de cours dans le store');

            // Vérifier si DES cours sont enregistrés dans le session storage
            let sessionCourses = sessionStorage.getItem('coursesArr');

            if (sessionCourses) {
                // Vérifier si les cours cibles se trouvent parmi eux
                sessionCourses = JSON.parse(sessionCourses);
                const target = sessionCourses.find(
                    (course) => course.subjectId === params.id
                )?.coursesList;
                if (target) {
                    setCoursesList(target);
                    const payload = {
                        subjectId: params.id,
                        coursesList: target,
                    };
                    dispatch(setCourses(payload));
                } else {
                    console.log(
                        'Il y a des cours dans le session storage mais ils ne nous concernent pas !'
                    );
                    // Requêter les cours cibles depuis le back, dispacher vers le store redux et enregister dans le session storage
                    fetchAndDispatch(sessionCourses);
                }
            } else {
                console.log('Pas de cours dans le session storage');
                fetchAndDispatch();
            }
        } else {
            setCoursesList(targetSubjectCourses);
        }
    }, []);
    return (
        <div>
            {coursesList.length > 0 ? (
                <ul className="playable-card__list">
                    {coursesList.map((item, i) => (
                        <PlayableCard key={i} media={item} />
                    ))}
                </ul>
            ) : (
                <h1>No courses yet !</h1>
            )}
        </div>
    );
};

export default Subject;
