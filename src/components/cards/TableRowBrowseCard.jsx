import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    deleteCourseById,
    deleteSubjectById,
} from '../../lib/actions/course.actions';
import toast from 'react-hot-toast';

const TableRowBrowseCard = ({ type, media }) => {
    const [deleteAction, setDeleteAction] = useState(false);

    useEffect(() => {
        if (media.id && deleteAction) {
            if (type === 'subject') {
                const deletion = async () => {
                    return await deleteSubjectById(media.id);
                };

                toast.promise(deletion(), {
                    loading: 'Deleting...',
                    success: 'Deleted !',
                    error: 'Something went wrong !',
                });
                setDeleteAction(false);
            } else if (type === 'learn') {
                const deletion = async () => {
                    return await deleteCourseById(media.id);
                };

                toast.promise(deletion(), {
                    loading: 'Deleting...',
                    success: 'Deleted !',
                    error: 'Something went wrong !',
                });
                setDeleteAction(false);
            }
        }
    }, [deleteAction]);

    const handleDelete = () => {
        setDeleteAction(true);
    };
    return (
        <tr className="table-row">
            {/* actual card */}

            {/* posterURL */}
            <td className="table-row__subject-field">
                <Link
                    className="browse-detail-card__figure-wrapper"
                    to={`/subject/edit/${media?.id}`}
                >
                    <figure className="browse-detail-card__figure">
                        <picture>
                            {/* <source srcset="" type='image/webp'/> */}
                            <source
                                srcSet={media?.posterUrl}
                                type="image/jpg"
                            />
                            <img
                                className="browse-detail-card__posterURL"
                                src={media?.posterUrl}
                                alt={media?.name}
                                loading="lazy"
                            />
                        </picture>
                    </figure>
                </Link>

                {/* Body */}
                {/* <div className="browse-detail-card__body"> */}
                <div>
                    <h4 className="table-row__heading">
                        <Link to={`/subject/edit/${media?.id}`}>
                            {media?.name}
                        </Link>
                    </h4>
                    <div className="table-row__description">
                        <p>{media?.description}</p>
                        <div className="table-row-hover__actions">
                            <Link to={`/${type}/edit/${media?.id}`}>
                                <button className="btn edit-btn">
                                    <img
                                        src="/assets/svg/edit.svg"
                                        alt="edit"
                                    />
                                </button>
                            </Link>
                            <button
                                className="btn delete-btn"
                                onClick={() => handleDelete()}
                            >
                                <img src="/assets/svg/trash.svg" alt="trash" />
                            </button>
                        </div>
                    </div>
                </div>
            </td>
            <td className="table-row__date">
                <p>{media?.createdAt}</p>
            </td>
            <td className="table-row__meta-tags">
                {media?.metaTags?.map((item) => (
                    <p key={item}>{item}</p>
                ))}
            </td>

            {/* Hover state */}
            {/* <div className="browse-detail-card-hover">
                    <Link
                        className="browse-detail-card-hover__link"
                        to={`/subject/${media?.id}`}
                    />
                    {/* Poster */}

            {/* Body */}
            {/* <div className="browse-detail-card-hover__body">
                        <h4>
                            <Link to={`/subject/${media?.id}`}>
                                {media?.name}
                            </Link>
                        </h4>
                        <h4>{media?.description}</h4>
                        <div className="metrics">
                            {media?.metrics?.map((item) => (
                                <Metric
                                    key={item.title}
                                    number={item.number}
                                    title={item.title}
                                />
                            ))}
                        </div>
                    </div> */}

            {/* Footer */}
            {/* <div className="browse-detail-card-hover__footer">
                        <div>
                            <ActionButtonPanel />
                        </div>
                    </div>
                </div> */}
        </tr>
    );
};

export default TableRowBrowseCard;
