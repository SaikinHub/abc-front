import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PreviewAvatarCard from '../cards/PreviewAvatarCard';
import { updateUserInfos } from '../../lib/actions/user.actions';
import toast from 'react-hot-toast';

const PersonalInfos = ({ initialContent }) => {
    const [file, setFile] = useState(undefined);
    const [fileError, setFileError] = useState(false);
    const [fileErrorMsg, setFileErrorMsg] = useState(undefined);
    const [isEditable, setIsEditable] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [data, setData] = useState(undefined);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstname: initialContent?.firstname ?? null,
            lastname: initialContent?.lastname ?? null,
            username: initialContent?.username ?? null,
            birthdate: initialContent?.birthdate ?? null,
            email: initialContent?.email ?? null,
            phone: initialContent?.phone ?? null,
            avatarUrl: initialContent?.profilePicture ?? null,
        },
        mode: 'onTouched',
    });

    const preview = {
        firstname: watch('firstname'),
        lastname: watch('lastname'),
        username: watch('username'),
        birthdate: watch('birthdate'),
        email: watch('email'),
        phone: watch('phone'),
        avatarUrl: watch('avatarUrl'),
    };

    const onSubmit = async (data) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'abc-image-upload');

            await fetch(
                'https://api.cloudinary.com/v1_1/dfaqqknvi/image/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    setData({ ...data, avatarUrl: res.secure_url });
                    setSubmit(true);
                });
        } else if (!file) {
            setData(data);
            setSubmit(true);
        }
    };

    useEffect(() => {
        if (submit) {
            const update = async () => {
                const payload = {
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    birthdate: data.birthdate,
                    email: data.email,
                    phone: data.phone,
                    avatarUrl: data.avatarUrl,
                };
                return await updateUserInfos(payload);
            };

            toast.promise(update(), {
                loading: 'Saving...',
                success: 'Saved !',
                error: 'Something went wrong !',
            });
            setIsEditable(false);
            setSubmit(false);
            setData(null);
        }
    }, [submit]);

    const handleCancel = () => {
        setValue('firstname', initialContent?.firstname ?? null);
        setValue('lastname', initialContent?.lastname ?? null);
        setValue('username', initialContent?.username ?? null);
        setValue('birthdate', initialContent?.birthdate ?? null);
        setValue('email', initialContent?.email ?? null);
        setValue('phone', initialContent?.phone ?? null);
        setValue('avatarUrl', initialContent?.profilePicture ?? null);
        setIsEditable(false);
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
                    setValue('avatarUrl', this.result);
                });
            }
        }
    }, [file]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="edit__form">
            <div>
                {/* Preview Card */}
                <div>
                    <PreviewAvatarCard preview={preview} setFile={setFile} />
                    {watch('avatarUrl') && isEditable && (
                        <p
                            className="edit__remove-poster-btn"
                            onClick={() => {
                                setValue('avatarUrl', null);
                                setFile(null);
                            }}
                        >
                            Remove Avatar
                        </p>
                    )}
                </div>
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
                    <label htmlFor="">Username</label>
                    <input
                        type="text"
                        {...register('username', {
                            required: 'This is required',
                            minLength: {
                                value: 2,
                                message: 'Min length is 2 characters',
                            },
                        })}
                        disabled={!isEditable}
                        className={`input ${
                            isEditable ? 'input--default' : 'input--disabled'
                        }`}
                        placeholder={'Your Username'}
                        autoComplete="off"
                    />
                    {isEditable && <p>{errors?.name?.message}</p>}
                </div>

                <div>
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'This is required',
                            minLength: {
                                value: 2,
                                message: 'Min length is 2 characters',
                            },
                        })}
                        disabled={!isEditable}
                        className={`input ${
                            isEditable ? 'input--default' : 'input--disabled'
                        }`}
                        placeholder={'Your Email'}
                        autoComplete="email"
                    />
                    {isEditable && <p>{errors?.name?.message}</p>}
                </div>

                <div>
                    <label htmlFor="">First Name</label>
                    <input
                        type="text"
                        {...register('firstname', {
                            minLength: {
                                value: 2,
                                message: 'Min length is 2 characters',
                            },
                        })}
                        disabled={!isEditable}
                        className={`input ${
                            isEditable ? 'input--default' : 'input--disabled'
                        }`}
                        placeholder={'Your First Name'}
                        autoComplete="given-name"
                    />
                    {isEditable && <p>{errors?.name?.message}</p>}
                </div>

                <div>
                    <label htmlFor="">Last Name</label>
                    <input
                        type="text"
                        {...register('lastname', {
                            minLength: {
                                value: 2,
                                message: 'Min length is 2 characters',
                            },
                        })}
                        disabled={!isEditable}
                        className={`input ${
                            isEditable ? 'input--default' : 'input--disabled'
                        }`}
                        placeholder={'Your Last Name'}
                        autoComplete="family-name"
                    />
                    {isEditable && <p>{errors?.name?.message}</p>}
                </div>

                <div>
                    <label htmlFor="">Birthdate</label>
                    <input
                        type="date"
                        {...register('birthdate', {
                            minLength: {
                                value: 2,
                                message: 'Min length is 2 characters',
                            },
                        })}
                        disabled={!isEditable}
                        className={`input ${
                            isEditable ? 'input--default' : 'input--disabled'
                        }`}
                        placeholder={'Your Birthdate'}
                        autoComplete="bday"
                    />
                    {isEditable && <p>{errors?.name?.message}</p>}
                </div>

                <div>
                    <label htmlFor="">Phone</label>
                    <input
                        type="phone"
                        {...register('phone', {
                            minLength: {
                                value: 2,
                                message: 'Min length is 2 characters',
                            },
                        })}
                        disabled={!isEditable}
                        className={`input ${
                            isEditable ? 'input--default' : 'input--disabled'
                        }`}
                        placeholder={'Your Phone'}
                        autoComplete="tel"
                    />
                    {isEditable && <p>{errors?.name?.message}</p>}
                </div>

                <div className="edit__actions-container">
                    {isEditable ? (
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
                            type="button"
                            className="btn btn--primary edit__create-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsEditable(true);
                            }}
                        >
                            edit
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default PersonalInfos;
