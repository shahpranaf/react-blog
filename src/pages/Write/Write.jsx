import { useState } from "react";
import { toast } from 'react-toastify';
import Loader from 'react-fullpage-custom-loader';

import { useCreateMediaMutation, useCreatePostMutation } from "../../store/apis/postsApi";
import "./write.css";

export default function Write() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState({
        url: "",
        id: ""
    });
    const [imageUploading, setImageUploading] = useState(false)

    const [createMedia] = useCreateMediaMutation();
    const [createPost] = useCreatePostMutation();

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle)
    }
    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent)
    }

    const handleFileChange = async (e) => {
        const newFile = e.target.files[0];
        if (newFile?.name) {
            setImageUploading(true);
            const formData = new FormData();
            formData.append("file", newFile);
            formData.append("title", newFile.name);
            try {
                const response = await createMedia(formData);
                setImageUploading(false);
                if (response.data) {
                    setFile({
                        url: response?.data?.source_url,
                        id: response?.data?.id
                    })
                }
            } catch {
                toast.error("Error uploading image");
                setImageUploading(false);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            content,
            featured_media: file?.id || 13,
            status: "publish"
        }
        if (title.trim() !== "") {
            const response = await createPost(newPost);
            if (response?.data?.id) {
                toast.success("Post created successfully");
            } else {
                toast.error("Error creating post");
            }
        }
    }

    return (
        imageUploading ?
            <Loader sentences={["Image is getting uploaded..."]} />
            : <div className="write">
                <img
                    className="writeImg"
                    src={file?.url}
                    alt=""
                />
                <form className="writeForm" onSubmit={handleSubmit}>
                    <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fas fa-plus"></i>
                        </label>
                        <input id="fileInput" type="file" style={{ display: "none" }} onChange={handleFileChange} />
                        <input
                            className="writeInput"
                            placeholder="Title"
                            type="text"
                            autoFocus={true}
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="writeFormGroup">
                        <textarea
                            className="writeInput writeText"
                            placeholder="Tell your story..."
                            type="text"
                            autoFocus={true}
                            value={content}
                            onChange={handleContentChange}
                        />
                    </div>
                    <button className="writeSubmit" type="submit">
                        Publish
                    </button>
                </form>
            </div>
    );
}