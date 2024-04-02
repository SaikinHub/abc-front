import { useNavigate } from 'react-router-dom';

const MediaCTA = ({ media }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(media.path);
    };

    return (
        <>
            <div className="picture-container" onClick={() => handleNavigate()}>
                <img src={media.posterUrl} alt="media poster" />
                {media.isVideo && (
                    <div className="media-cta__play-icon-container">
                        <img src="/assets/svg/play-gold.svg" alt="play icon" />
                    </div>
                )}
            </div>
            <button onClick={() => handleNavigate()}>{media.title}</button>
        </>
    );
};

export default MediaCTA;
