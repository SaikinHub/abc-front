import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerMetric from '../BannerMetric';

const DetailBanner = ({ setHasSubscribed }) => {
    const { subjectsArr } = useSelector((state) => state.subjects);
    const dispatch = useDispatch();
    const params = useParams();

    const [data, setData] = useState(null);

    const metrics = [
        {
            number: 46,
            title: 'Episodes',
        },
        {
            number: 52,
            title: 'Extra Episodes',
        },
        {
            number: 12,
            title: 'Activities',
        },
        {
            number: 8,
            title: 'Extra Ressources',
        },
    ];

    useEffect(() => {
        const payload = {
            name: 'Big Ben',
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            posterUrl: '/assets/images/default-banner-b.png',
            genre: 'English',
        };

        setData(payload);
    }, []);
    return (
        <div className="detail-banner">
            {data && (
                <>
                    <picture className="detail-banner__poster">
                        <img src={data?.posterUrl} alt="title poster" />
                    </picture>
                    <div className="detail-banner__wrapper">
                        <div className="detail-banner__infos">
                            <h2 className="detail-banner__heading">
                                {data?.name}
                            </h2>

                            <ul className="detail-banner__metrics">
                                {metrics.map((item, i) => (
                                    <li key={i}>
                                        <BannerMetric metric={item} />
                                    </li>
                                ))}
                            </ul>
                            <p className="detail-banner__paragraph">
                                {data?.description}
                            </p>
                            <div className="detail-banner__cta-group">
                                <div>
                                    <p className="detail-banner__badge">
                                        Learn {data?.genre}
                                    </p>
                                    <button
                                        onClick={() => setHasSubscribed(true)}
                                        className="btn btn--primary"
                                    >
                                        196 h - 18 Semaines *
                                    </button>
                                    <p className="detail-banner__sidenote">
                                        *Estimated time to complete
                                    </p>
                                </div>
                                <button className="btn btn--secondary">
                                    See first
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailBanner;
