import { useParams } from 'react-router-dom';
import PlayableCard from '../../../../components/cards/PlayableCard';
import Tabs from '../../../../components/Tabs';
import { useEffect, useState } from 'react';
import { getCoursesBySubjectId } from '../../../../lib/actions/course.actions';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../../../../lib/utils/globalState/coursesSlice';
import PlayableBanner from '../../../../components/cards/PlayableBanner';
import DetailBanner from '../../../../components/cards/DetailBanner';

const Subject = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { subjectsArr } = useSelector((state) => state.subjects);
    const { globalStateCoursesArr } = useSelector((state) => state.courses); // Global state
    const [coursesList, setCoursesList] = useState([]);
    const [videoCoursesList, setVideoCoursesList] = useState([]);

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
        const payload = [
            {
                id: 1,
                name: "S.1 ÉP 1 - Les larmes de l'hôte",
                path: '/watch/1',
                posterUrl:
                    'https://m.media-amazon.com/images/S/pv-target-images/ad1125778c30d4973c96e6dab72158c9663392353d97f33c6ebd65161bf1d9e5.jpg',
                subject: 'Big Ben',
                updatedAt: '',
                metaTags: ['258 k views', '1 month ago'],
                description: '',
                title: 'Watch First Episode',
                isVideo: true,
            },
            {
                id: 2,
                name: 'S.1 ÉP 2 - Le retour du Roi !',
                path: '/watch/2',
                posterUrl:
                    'https://media.lesechos.com/api/v1/images/view/5ee37f2a3e45467ed354a6bd/1280x720/2279472-anna-une-espionne-venue-du-froid-web-tete-0601551431320.jpg',
                subject: 'Big Ben',
                updatedAt: '',
                metaTags: ['149 k views', '1 month ago'],
                description: '',
                isVideo: true,
            },
            {
                id: 3,
                name: 'S.1 ÉP 3 - Un sombre passé',
                path: '/watch/3',
                posterUrl:
                    'https://culturaddict.com/wp-content/uploads/2016/09/image_tech_B_0525183715.jpg',
                subject: 'Big Ben',
                updatedAt: '',
                metaTags: ['129 k views', '1 month ago'],
                description: '',
                isVideo: true,
            },
        ];
        setVideoCoursesList(payload);
    }, []);

    const [activeTab, setActiveTab] = useState(0);
    const [details, setDetails] = useState(null);
    const [media, setMedia] = useState(null);
    const [details2, setDetails2] = useState(null);
    const [media2, setMedia2] = useState(null);
    const [hasSubscribed, setHasSubscribed] = useState(false);

    useEffect(() => {
        let payload = subjectsArr.find((item) => item.id === +params.id);

        setDetails({
            ...payload,
            posterUrl: '/assets/images/default-banner-a.png',
        });

        let payload2 = globalStateCoursesArr.find(
            (item) => item.subjectId === params.id
        )?.coursesList[0];

        setMedia({
            ...payload2,
            title: 'Learn 101',
            path: `/learn/${payload2?.id}`,
        });

        setDetails2({
            posterUrl: '/assets/images/default-banner-b.png',
            name: 'Big Ben',
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        });
        setMedia2({
            posterUrl:
                'https://images.unsplash.com/photo-1543958892-44b098374a87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Play First Episode',
        });
    }, []);
    return (
        <div>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 0 ? (
                coursesList.length > 0 ? (
                    <>
                        <PlayableBanner details={details} media={media} />
                        <h3>Ch1: Introduction</h3>
                        <ul className="playable-card__list">
                            {coursesList.map((item, i) => (
                                <PlayableCard
                                    key={i}
                                    type="course"
                                    media={item}
                                />
                            ))}
                        </ul>
                    </>
                ) : (
                    <h1>No courses yet !</h1>
                )
            ) : hasSubscribed ? (
                <>
                    <PlayableBanner
                        details={details2}
                        media={videoCoursesList[0]}
                    />
                    <h3>S1: Groove Street</h3>
                    <ul className="playable-card__list">
                        {videoCoursesList.map((item, i) => (
                            <PlayableCard key={i} type="video" media={item} />
                        ))}
                    </ul>
                </>
            ) : (
                <DetailBanner setHasSubscribed={setHasSubscribed} />
            )}
        </div>
    );
};

export default Subject;
