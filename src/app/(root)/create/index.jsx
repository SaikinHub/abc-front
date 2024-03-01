import EditContent from '../../../components/forms/EditContent';

const CreateContent = () => {
    const handleChange = (e) => {};

    return (
        <div>
            <h2>Create</h2>
            <EditContent
                onChange={handleChange}
                action="create"
                type="subject"
            />
        </div>
    );
};

export default CreateContent;
