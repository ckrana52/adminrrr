import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import urljoin from "url-join";
import { toastDefault } from "../utils/handler.utils";
import { getLocal, getSession } from "../utils/localStorage.utils";
const token = getLocal('token') || getSession('token')

function useUpload(files, name, url) {
    const [path, setPath] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadFailed, setUploadFailed] = useState(false);
    useEffect(() => {
        if (files) {
            setUploading(true);
            let formData = new FormData();
            formData.append(`${name || "image"}`, files);

            axios({
                url: url || urljoin(process.env.REACT_APP_API_ENDPOINT, "v1/upload/image"),
                method: "POST",
                headers: {
                    authorization: token
                },
                data: formData,
            })
                .then((res) => {
                    setUploading(false);
                    setPath(res.data.data.image);
                })
                .catch((err) => {
                    setUploading(false);
                    setUploadFailed(true);
                    toast.error('Image upload Failed, May be image size is too large', toastDefault)
                });
        }
    }, [files]);
    return { path, uploading, uploadFailed };
}

export default useUpload;
