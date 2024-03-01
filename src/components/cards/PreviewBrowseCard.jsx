import Badge from '../Badge';
import Metric from '../Metric';
import ActionIconButton from '../ActionIconButton';

const PreviewBrowseCard = ({ preview, setFile }) => {
    return (
        <div className="edit__poster-container">
            {preview?.name && preview?.posterUrl && (
                <p>Hover the card to see more !</p>
            )}

            <div
                className={`edit__file-input-label-container ${
                    !preview?.name && !preview?.description ? 'no-pointer' : ''
                }`}
            >
                {/* <browseCard preview={preview} /> */}

                <div className="browse-card__wrapper">
                    <div className="card browse-card">
                        {/* actual card */}

                        {/* posterURL */}
                        <figure className="browse-card__figure">
                            {preview?.posterUrl ? (
                                <>
                                    <picture>
                                        {/* <source srcset="" type='image/webp'/> */}
                                        <source
                                            srcSet={preview?.posterUrl}
                                            type="image/jpg"
                                        />
                                        <img
                                            className="browse-card__posterURL"
                                            src={preview?.posterUrl}
                                            alt={preview?.name}
                                            loading="lazy"
                                        />
                                    </picture>
                                    <Badge title={preview?.subject} />
                                </>
                            ) : (
                                <div className="playable-card__figure-placeholder">
                                    <ActionIconButton
                                        action="add poster"
                                        iconUrl="/assets/svg/plus-sign.svg"
                                    />
                                </div>
                            )}
                        </figure>

                        {/* Body */}
                        <div className="browse-card__body">
                            <h4>{preview?.name}</h4>

                            {/* Footer */}
                            <div className="browse-card__footer">
                                <div>
                                    <span>
                                        {preview?.metaTags?.join(' | ')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hover state */}
                        <div className="browse-card-hover">
                            {/* Poster */}

                            {/* Body */}
                            <div className="browse-card-hover__body">
                                <h4>{preview?.name}</h4>
                                <h4 className="browse-card-hover__description">
                                    {preview?.description}
                                </h4>
                                <div className="metrics">
                                    {preview?.metrics?.map((item) => (
                                        <Metric
                                            key={item.title}
                                            number={item.number}
                                            title={item.title}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            {/* <div className="browse-card-hover__footer">
                        <div>
                            <ActionButtonPanel />
                        </div>
                    </div> */}
                        </div>
                    </div>
                </div>

                {!preview?.posterUrl && (
                    <label
                        className="edit__file-input-label"
                        htmlFor="edit-file"
                    >
                        <input
                            type="file"
                            name="poster"
                            onChange={(e) => setFile(e.target.files[0])}
                            id="edit-file"
                        />
                    </label>
                )}
            </div>
        </div>
    );
};

export default PreviewBrowseCard;
