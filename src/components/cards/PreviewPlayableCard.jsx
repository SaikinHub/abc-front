import Metric from '../Metric';
import ActionIconButton from '../ActionIconButton';

const PreviewPlayableCard = ({ preview, setFile }) => {
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

                <div className="playable-card__wrapper">
                    <div className="card playable-card">
                        {/* actual card */}

                        {/* posterUrl */}
                        <figure className="playable-card__figure">
                            {preview.posterUrl ? (
                                <>
                                    <picture>
                                        {/* <source srcset="" type='image/webp'/> */}
                                        <source
                                            srcSet={preview?.posterUrl}
                                            type="image/jpg"
                                        />
                                        <img
                                            className="playable-card__posterUrl"
                                            src={preview?.posterUrl}
                                            alt={preview?.name}
                                            loading="lazy"
                                        />
                                    </picture>
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
                        <div className="playable-card__body">
                            <p>{preview?.relatedSubject}</p>
                            <h4>{preview?.name}</h4>

                            {/* Footer */}
                            <div className="playable-card__footer">
                                <div>
                                    <span>
                                        {preview?.metaTags?.join(' | ')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hover state */}
                        <div className="playable-card-hover">
                            {/* Poster */}

                            {/* Body */}
                            <div className="playable-card-hover__body">
                                <p>{preview?.relatedSubject}</p>
                                <h4>{preview?.name}</h4>
                                <h4>{preview?.description}</h4>
                                <div className="metrics">
                                    <p>Last update :</p>
                                    <Metric
                                        key={preview.title}
                                        date={preview?.updatedAt}
                                    />
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

export default PreviewPlayableCard;
