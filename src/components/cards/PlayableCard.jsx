import { Link } from 'react-router-dom';
import Metric from '../Metric';

const PlayableCard = ({ media }) => {
    const {
        id,
        name,
        description,
        posterUrl,
        subject,
        metaTags,
        metrics,
        updatedAt,
    } = media;
    return (
        <li className="playable-card__wrapper">
            <div className="card playable-card">
                {/* actual card */}

                {/* posterURL */}
                <Link
                    className="playable-card__figure-wrapper"
                    to={`/learn/${id}`}
                >
                    <figure className="playable-card__figure">
                        <picture>
                            {/* <source srcset="" type='image/webp'/> */}
                            <source srcSet={posterUrl} type="image/jpg" />
                            <img
                                className="playable-card__posterURL"
                                src={posterUrl}
                                alt={name}
                                loading="lazy"
                            />
                        </picture>
                    </figure>
                </Link>

                {/* Body */}
                <div className="playable-card__body">
                    <p>{subject}</p>

                    <h4>{name}</h4>

                    {/* Footer */}
                    <div className="playable-card__footer">
                        <div>
                            <span>{metaTags?.join(' | ')}</span>
                        </div>
                    </div>
                </div>

                {/* Hover state */}
                <div className="playable-card-hover">
                    <Link
                        className="playable-card-hover__link"
                        to={`/learn/${id}`}
                    />
                    {/* Poster */}

                    {/* Body */}
                    <div className="playable-card-hover__body">
                        <p>{subject}</p>
                        <h4>
                            <Link to={`/learn/${id}`}>{name}</Link>
                        </h4>
                        <h4>{description}</h4>
                        <div className="metrics">
                            <p>Last updated:</p>
                            {/* Formater la date */}
                            <Metric date={updatedAt} />
                        </div>
                    </div>

                    {/* Footer */}
                    {/* <div className="playable-card-hover__footer">
                        <div>
                            <ActionButtonPanel />
                        </div>
                    </div> */}
                </div>
            </div>
        </li>
    );
};

export default PlayableCard;
