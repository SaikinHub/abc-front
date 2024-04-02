import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/react/style.css';

export const Editor = ({ onChange, initialContent, editable }) => {
    const handleUpload = async (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'abc-image-upload');

            const url = new Promise(async (resolve) => {
                await fetch(
                    'https://api.cloudinary.com/v1_1/dfaqqknvi/image/upload',
                    {
                        method: 'POST',
                        body: formData,
                    }
                )
                    .then((res) => res.json())
                    .then((res) => {
                        resolve(res.secure_url);
                    });
            });
            return url;
        }
    };

    const editor = useBlockNote({
        editable,
        initialContent: initialContent ? JSON.parse(initialContent) : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
        uploadFile: handleUpload,
    });
    return (
        <div className="editor">
            <BlockNoteView editor={editor} />
        </div>
    );
};
