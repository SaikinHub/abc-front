import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PreviewBrowseCard from '../cards/PreviewBrowseCard';
import PreviewPlayableCard from '../cards/PreviewPlayableCard';
import {
    createCourse,
    setSubjectInfos,
    updateCourse,
    updateSubjectInfos,
} from '../../lib/actions/course.actions';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllSubjects } from '../../lib/actions/subject.actions';

const EditContent = ({ onChange, type, initialContent, action }) => {
    const [contentType, setContentType] = useState(type);
    const [isEditable, setIsEditable] = useState(action === 'create');
    const [isSubject, setIsSubject] = useState(
        type === 'subject' || action === 'create'
    );
    const [file, setFile] = useState(undefined);
    const [fileError, setFileError] = useState(false);
    const [fileErrorMsg, setFileErrorMsg] = useState(undefined);
    const [submit, setSubmit] = useState(false);
    const [data, setData] = useState(undefined);

    const params = useParams();
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([
        {
            id: 1,
            name: 'My little poney',
            topic: 'English',
            description: 'Voici ce dont est capable Saikin !',
            posterUrl:
                'https://www.nostalgift.com/wp-content/uploads/2020/11/ponet-heart-throb.jpg',
            createdAt: '2024-02-13T17:23:47.000Z',
            updatedAt: '2024-02-17T12:42:21.000Z',
            metrics: [
                {
                    number: 8,
                    title: 'chapters',
                },
                {
                    number: 12,
                    title: 'activities',
                },
            ],
            metaTags: ['A Class', 'B Class'],
        },
        {
            id: 3,
            name: "S'occuper d'un enfant",
            topic: 'English',
            description:
                'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
            posterUrl:
                'https://res.cloudinary.com/dfaqqknvi/image/upload/v1708101003/abc-image-upload/nv5atkoodnxkr3yf3nmq.jpg',
            createdAt: '2024-02-16T16:30:04.000Z',
            updatedAt: '2024-02-16T16:30:04.000Z',
            metrics: [],
            metaTags: ['A Class'],
        },
    ]);
    useEffect(() => {
        const fetch = async () => {
            const result = await getAllSubjects();
            setSubjects(result.subjects);
        };
        fetch().then(() =>
            setValue('relatedSubject', parseInt(initialContent?.relatedSubject))
        );
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: initialContent?.name ?? null,
            description: initialContent?.description ?? null,
            poster: initialContent?.posterUrl ?? null,
            badge: initialContent?.subject ?? null,
            relatedSubject: parseInt(initialContent?.relatedSubject) ?? null,
        },
        mode: 'onTouched',
    });

    const preview = {
        name: watch('name'),
        description: watch('description'),
        posterUrl: watch('poster'),
        subject: watch('badge'),
        relatedSubject:
            subjects &&
            subjects.find((item) => +item.id === +watch('relatedSubject'))
                ?.name,
        metrics: [
            {
                number: '0',
                title: 'Chapters',
            },
            {
                number: '0',
                title: 'Courses',
            },
            {
                number: '0',
                title: 'Activities',
            },
        ],
        metaTags: initialContent?.metaTags ?? ['MetaTag 1, MetaTag 2'],
        updatedAt: Date.now(),
    };

    useEffect(() => {
        if (file) {
            const type = file?.type ?? undefined;
            const size = file?.size < 4000000;
            const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

            const validFile = acceptedTypes.includes(type) && size;

            if (validFile) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.addEventListener('load', function () {
                    setValue('poster', this.result);
                });
            }
        }
    }, [file]);

    useEffect(() => {
        if (submit) {
            if (contentType === 'subject') {
                if (!initialContent) {
                    const payload = {
                        name: data.name,
                        description: data.description,
                        posterUrl: data.poster,
                    };

                    const create = async () => {
                        return await setSubjectInfos(payload);
                    };

                    toast.promise(create(), {
                        loading: 'Saving...',
                        success: 'Saved !',
                        error: 'Something went wrong !',
                    });
                    setSubmit(false);
                    setData(null);
                } else {
                    const update = async () => {
                        return await updateSubjectInfos({
                            id: parseInt(params.id),
                            name: data.name,
                            description: data.description,
                            posterUrl: data.poster,
                            subjectId: data.relatedSubject,
                        });
                    };

                    toast.promise(update(), {
                        loading: 'Saving...',
                        success: 'Saved !',
                        error: 'Something went wrong !',
                    });
                    setIsEditable(false);
                }
                navigate('/subject/all');
            } else if (contentType === 'course') {
                if (!initialContent) {
                    const payload = {
                        name: data.name,
                        description: data.description,
                        posterUrl: data.poster,
                        subjectId: parseInt(data.relatedSubject),
                    };

                    const create = async () => {
                        return await createCourse(payload);
                    };

                    toast.promise(create(), {
                        loading: 'Saving...',
                        success: 'Saved !',
                        error: 'Something went wrong !',
                    });
                } else {
                    const postUpdate = async () => {
                        return await updateCourse({
                            id: params.id,
                            name: data.name,
                            description: data.description,
                            posterUrl: data.poster,
                            subjectId: data.relatedSubject,
                        });
                    };

                    toast.promise(postUpdate(), {
                        loading: 'Saving...',
                        success: 'Saved !',
                        error: 'Something went wrong !',
                    });
                }
                navigate(`/subject/edit/${data.relatedSubject}`);
            }
        }
    }, [submit]);

    const onSubmit = async (data) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file); // Changer la version binary par la version objet
            formData.append('upload_preset', 'abc-image-upload'); // Changer la version binary par la version Array

            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dfaqqknvi/image/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    if (res.secure_url) {
                        setData({ ...data, poster: res.secure_url });
                        setSubmit(true);
                    } else {
                        setSubmit(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setSubmit(false);
                });
        } else if (!file) {
            setData(data);
            setSubmit(true);
        }
    };

    const handleCancel = () => {
        setValue('name', initialContent?.name ?? null);
        setValue('description', initialContent?.description ?? null);
        setValue('poster', initialContent?.posterUrl ?? null);
        setValue('badge', initialContent?.subject ?? null);
        setValue(
            'relatedSubject',
            parseInt(initialContent?.relatedSubject) ?? null
        );
        setIsEditable(false);
    };

    return (
        <>
            {action === 'create' && (
                <div className="edit__type-btn-container">
                    <button
                        className={`btn ${
                            isSubject ? 'btn--primary' : 'btn--tertiary'
                        }`}
                        onClick={() => {
                            setIsSubject(true);
                            setContentType('subject');
                        }}
                    >
                        Subject
                    </button>
                    <button
                        className={`btn ${
                            isSubject ? 'btn--tertiary' : 'btn--primary'
                        }`}
                        onClick={() => {
                            setIsSubject(false);
                            setContentType('course');
                        }}
                    >
                        Course
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="edit__form">
                <div>
                    {contentType === 'subject' ? (
                        <PreviewBrowseCard
                            preview={preview}
                            setFile={setFile}
                        />
                    ) : (
                        <PreviewPlayableCard
                            preview={preview}
                            setFile={setFile}
                        />
                    )}
                    {fileError && <p>{fileErrorMsg}</p>}
                    {watch('poster') && isEditable && (
                        <p
                            className="edit__remove-poster-btn"
                            onClick={() => setValue('poster', undefined)}
                        >
                            Remove Poster
                        </p>
                    )}
                </div>
                <div className="edit__text-inputs">
                    <div>
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            {...register('name', {
                                required: 'This is required',
                                minLength: {
                                    value: 5,
                                    message: 'Min length is 5 characters',
                                },
                            })}
                            disabled={!isEditable}
                            className={`input ${
                                isEditable
                                    ? 'input--default'
                                    : 'input--disabled'
                            }`}
                            placeholder={
                                isSubject ? 'Subject name...' : 'Course name...'
                            }
                        />
                        {isEditable && <p>{errors?.name?.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="">Description</label>
                        <textarea
                            {...register('description', {
                                required: 'This is required',
                                minLength: {
                                    value: 20,
                                    message: 'Min length is 20 characters',
                                },
                            })}
                            id=""
                            cols={30}
                            rows={8}
                            disabled={!isEditable}
                            className={`input ${
                                isEditable
                                    ? 'input--default'
                                    : 'input--disabled'
                            }`}
                            placeholder="A quick description..."
                        />
                        {isEditable && <p>{errors?.description?.message}</p>}
                    </div>

                    {isSubject ? (
                        <div>
                            <label htmlFor="">Badge Title</label>
                            <input
                                type="text"
                                {...register('badge', {
                                    required: 'This is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Min length is 3 characters',
                                    },
                                })}
                                className={`input ${
                                    isEditable
                                        ? 'input--default'
                                        : 'input--disabled'
                                }`}
                                disabled={!isEditable}
                                placeholder={`ex: Learn "English"`}
                            />
                            {isEditable && <p>{errors?.badge?.message}</p>}
                        </div>
                    ) : (
                        <div className="edit__subject-select-container">
                            <label htmlFor="">Related Subject</label>
                            <select
                                {...register('relatedSubject', {
                                    required: 'This is required',
                                })}
                                disabled={!isEditable}
                                className={`input ${
                                    isEditable
                                        ? 'input--default'
                                        : 'input--disabled'
                                }`}
                            >
                                <option disabled>Select Subject</option>
                                {subjects &&
                                    subjects.map((item, i) => (
                                        <option
                                            key={i}
                                            value={parseInt(item?.id)}
                                        >
                                            "{item?.name}"
                                        </option>
                                    ))}
                            </select>
                            {isEditable && (
                                <p>{errors?.relatedSubject?.message}</p>
                            )}
                        </div>
                    )}
                    <div className="edit__actions-container">
                        {action === 'create' && (
                            <button
                                type="submit"
                                className="btn btn--primary edit__create-btn"
                            >
                                {`Create ${isSubject ? 'Subject' : 'Course'}`}
                            </button>
                        )}

                        {action === 'update' &&
                            (isEditable ? (
                                <>
                                    <button
                                        type="submit"
                                        className="btn edit__update-btn"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="btn edit__cancel-btn"
                                        onClick={() => handleCancel()}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="btn btn--primary edit__create-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsEditable((prev) => !prev);
                                    }}
                                >
                                    edit
                                </button>
                            ))}
                        {/* <button
                                    type="submit"
                                    className="btn edit__update-btn"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn edit__cancel-btn"
                                    onClick={() => handleCancel()}
                                >
                                    Cancel
                                </button> */}
                        {/* </> */}
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditContent;

{
    /* <div className={`edit__poster ${isEditable ? 'editable' : ''}`}>
    <label htmlFor="edit-file"> */
}
{
    /* If initial content => show poster */
}
{
    /* <figure className="browse-card__figure">
            {watch('poster') ? (
                <>
                    <picture> */
}
{
    /* <source srcset="" type='image/webp'/> */
}
{
    /* <source srcSet={watch('poster')} type="image/jpg" />
                        <img
                            className="browse-card__posterURL"
                            src={watch('poster')}
                            alt={'poster'}
                            loading="lazy"
                        />
                    </picture>
                    {isSubject && <Badge title={watch('badge')} />}
                </>
            ) : (
                <ActionIconButton
                    action="add poster"
                    iconUrl="/assets/svg/plus-sign.svg"
                />
            )}
        </figure> */
}

{
    /* If editable => Allow poster change && show 'edit poster' message, on hover */
}
//         {isEditable && (
//             <>
//                 <input
//                     type="file"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     id="edit-file"
//                 />

//                 <div className="edit__poster-hover">
//                     <p>
//                         {initialContent || watch('poster')
//                             ? 'Change Poster ?'
//                             : 'Add Poster ?'}
//                     </p>
//                 </div>
//                 {isEditable && <p>{errors?.poster?.message}</p>}
//             </>
//         )}
//     </label>
// </div>;

// const handleNameChange = (e) => {
//     setFields({
//         ...fields,
//         name: e.target.value,
//     });
// };

// const handleDescriptionChange = (e) => {
//     setFields({
//         ...fields,
//         description: e.target.value,
//     });
// };

// const handleBadgeChange = (e) => {
//     setFields({
//         ...fields,
//         badge: e.target.value,
//     });
// };

// <>
//     <button
//         className="btn btn--primary"
//         onClick={() => setIsSubject(true)}
//     >
//         Subject
//     </button>
//     <button
//         className="btn btn--primary"
//         onClick={() => setIsSubject(false)}
//     >
//         Course
//     </button>
//     <form className="edit__form">
//         <div className={`edit__poster ${isEditable ? 'editable' : ''}`}>
//             <label htmlFor="edit-file">
//                 {isEditable && (
//                     <input type="file" name="" id="edit-file" />
//                 )}
//                 <figure className="browse-card__figure">
//                     <picture>
//                         {/* <source srcset="" type='image/webp'/> */}
//                         <source
//                             srcSet={fields.poster}
//                             type="image/jpg"
//                         />
//                         <img
//                             className="browse-card__posterURL"
//                             src={fields.poster}
//                             alt={fields.name}
//                             loading="lazy"
//                         />
//                     </picture>
//                     {isSubject && <Badge title={fields?.badge} />}
//                 </figure>
//             </label>
//             {isEditable && (
//                 <div className="edit__poster-hover">
//                     <p>Change Poster ?</p>
//                 </div>
//             )}
//         </div>
//         <div className="edit__text-inputs">
//             <div>
//                 <label htmlFor="">Name</label>
//                 <input
//                     type="text"
//                     value={fields?.name}
//                     onChange={handleNameChange}
//                     required
//                     disabled={!isEditable}
//                     className={`input ${
//                         isEditable
//                             ? 'input--default'
//                             : 'input--disabled'
//                     }`}
//                     placeholder={
//                         isSubject ? 'Subject name...' : 'Course name...'
//                     }
//                 />
//             </div>
//             <div>
//                 <label htmlFor="">Description</label>
//                 <textarea
//                     name=""
//                     id=""
//                     cols={30}
//                     rows={8}
//                     disabled={!isEditable}
//                     value={fields?.description}
//                     onChange={handleDescriptionChange}
//                     className={`input ${
//                         isEditable
//                             ? 'input--default'
//                             : 'input--disabled'
//                     }`}
//                     placeholder="A quick description..."
//                 />
//             </div>
//             {isSubject ? (
//                 <div>
//                     <label htmlFor="">Badge Title</label>
//                     <input
//                         type="text"
//                         required
//                         className={`input ${
//                             isEditable
//                                 ? 'input--default'
//                                 : 'input--disabled'
//                         }`}
//                         disabled={!isEditable}
//                         value={fields?.badge}
//                         onChange={handleBadgeChange}
//                         placeholder={`ex: Learn "English"`}
//                     />
//                 </div>
//             ) : (
//                 <div>
//                     <label htmlFor="">Related Subject</label>
//                     <select
//                         name=""
//                         id=""
//                         placeholder="Select Subject"
//                         defaultValue={{
//                             label: 'Select Subject',
//                             value: 0,
//                         }}
//                     >
//                         {/* <option disabled value="">
//                             Select Type
//                         </option> */}
//                         {subjectsList &&
//                             subjectsList.map((item, i) => (
//                                 <option key={i} value={item.id}>
//                                     {item.name}
//                                 </option>
//                             ))}
//                     </select>
//                 </div>
//             )}
//             <div className="edit__actions-container">
//                 {isEditable ? (
//                     <button
//                         className="btn edit__edit-btn"
//                         onClick={() => setIsEditable((prev) => !prev)}
//                     >
//                         Edit
//                     </button>
//                 ) : (
//                     <>
//                         <button className="btn edit__update-btn">
//                             Update
//                         </button>
//                         <button
//                             className="btn edit__cancel-btn"
//                             onClick={() => setIsEditable(false)}
//                         >
//                             Cancel
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     </form>
// </>

{
    /* <div className="edit__poster-container">
                    {watch('name') && watch('poster') && (
                        <p>Hover the card to see more !</p>
                    )}
                    {isSubject ? (
                        <div
                            className={`edit__file-input-label-container ${
                                !watch('name') && !watch('description')
                                    ? 'no-pointer'
                                    : ''
                            }`}
                        >
                            <BrowseCard media={preview} />

                            {!watch('poster') && (
                                <label
                                    className="edit__file-input-label"
                                    htmlFor="edit-file"
                                >
                                    <input
                                        type="file"
                                        name="poster"
                                        onChange={(e) =>
                                            setFile(e.target.files[0])
                                        }
                                        id="edit-file"
                                    />
                                </label>
                            )}
                        </div>
                    ) : (
                        <div
                            className={`edit__file-input-label-container ${
                                !watch('name') && !watch('description')
                                    ? 'no-pointer'
                                    : ''
                            }`}
                        >
                            <PlayableCard media={preview} />
                            {!watch('poster') && (
                                <label
                                    className="edit__file-input-label"
                                    htmlFor="edit-file"
                                >
                                    <input
                                        type="file"
                                        name="poster"
                                        onChange={(e) =>
                                            setFile(e.target.files[0])
                                        }
                                        id="edit-file"
                                    />
                                </label>
                            )}
                        </div>
                    )}
                    {watch('poster') && isEditable && (
                        <p
                            className="edit__remove-poster-btn"
                            onClick={() => setValue('poster', undefined)}
                        >
                            Remove Poster
                        </p>
                    )}
                </div> */
}
