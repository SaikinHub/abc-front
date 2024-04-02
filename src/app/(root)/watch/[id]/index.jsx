import { Link } from 'react-router-dom';

const Watch = () => {
    const media = {
        subject: {
            name: 'Big Ben',
            id: 13,
        },
        title: 'Enter: Naruto Uzumaki !',
        season: '1',
        episode: '2',
        videoUrl: '',
    };
    return (
        <section>
            <div className="watch__wrapper">
                <div className="watch__video-group">
                    <h3 className="watch__heading">
                        {`S.${media.season} Ep.${media.episode}`} <br />
                        <span>{media.title}</span>
                    </h3>
                    {/* <video src=""></video> */}
                    <iframe
                        className="watch__video"
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/QFVkTTCkht8?si=Xbp8mSLxvum1m9k5"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <div className="watch__right-sidebar">
                    <Link to={`/subject/${media.subject.id}`}>
                        <h2>{media.subject.name}</h2>
                    </Link>
                    <img src="/assets/images/fake-tree.png" alt="fake tree" />
                </div>
            </div>
        </section>
    );
};

export default Watch;
