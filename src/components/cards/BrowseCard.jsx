import { Link } from 'react-router-dom';
import Badge from '../Badge';
import Metric from '../Metric';
import ActionButtonPanel from '../ActionButtonPanel';

const BrowseCard = ({ media }) => {
    const { id, name, description, posterUrl, topic, metaTags, metrics } =
        media;
    return (
        <li className="browse-card__wrapper">
            <div className="card browse-card">
                <Link
                    className="browse-card__figure-wrapper"
                    to={`/subject/${id}`}
                >
                    <figure className="browse-card__figure">
                        <picture>
                            {/* <source srcset="" type='image/webp'/> */}
                            <source srcSet={posterUrl} type="image/jpg" />
                            <img
                                className="browse-card__posterURL"
                                src={posterUrl}
                                alt={name}
                                loading="lazy"
                            />
                        </picture>
                        <Badge title={topic} />
                    </figure>
                </Link>

                <div className="browse-card__body">
                    <h4>
                        <Link to={`/subject/${id}`}>{name}</Link>
                    </h4>

                    <div className="browse-card__footer">
                        <div>
                            <span>{metaTags?.join(' | ')}</span>
                        </div>
                    </div>
                </div>

                <div className="browse-card-hover">
                    <Link
                        className="browse-card-hover__link"
                        to={`/subject/${id}`}
                    />

                    <div className="browse-card-hover__body">
                        <h4>
                            <Link to={`/subject/${id}`}>{name}</Link>
                        </h4>
                        <h4>{description}</h4>
                        <div className="metrics">
                            {metrics?.map((item) => (
                                <Metric
                                    key={item?.title}
                                    number={item?.number}
                                    title={item?.title}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="browse-card-hover__footer">
                        <div>
                            <ActionButtonPanel type="playable" />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default BrowseCard;
