import { useParams } from 'react-router-dom';
import MediaCTA from './MediaCTA';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PlayableBanner = ({ details, media }) => {
    const { subjectsArr } = useSelector((state) => state.subjects);
    const { globalStateCoursesArr } = useSelector((state) => state.courses);
    const dispatch = useDispatch();
    const params = useParams();

    const [data, setData] = useState(null);
    const [firstCourse, setFirstCourse] = useState(null);

    // useEffect(() => {
    //     const payload = subjectsArr.find((item) => item.id === +params.id);
    //     setData({
    //         ...payload,
    //         posterUrl:
    //             'https://www.thoughtco.com/thmb/mQq2d8aNCsXVBuJlZRqk0GEZSwk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/French-Flag-2015-56a239ed3df78cf77273708c.jpg',
    //     });

    //     const payload2 = globalStateCoursesArr.find(
    //         (item) => item.subjectId === params.id
    //     )?.coursesList[0];
    //     setFirstCourse({
    //         ...payload2,
    //         title: 'Go to 101',
    //         path: `/learn/${payload2.id}`,
    //     });
    // }, []);
    return (
        <div className="playable-banner">
            {details && (
                <>
                    <picture className="playable-banner__poster">
                        <img src={details.posterUrl} alt="title poster" />
                    </picture>
                    <div className="playable-banner__wrapper">
                        <div className="playable-banner__infos">
                            <h2>{details.name}</h2>
                            <p>{details.description}</p>
                        </div>
                        {media && (
                            <div className="playable-banner__cta">
                                <MediaCTA media={media} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default PlayableBanner;
