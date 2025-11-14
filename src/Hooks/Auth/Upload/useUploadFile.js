import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import API from "Services/Api";
import { toast } from "react-toastify";

const useUploadFile = ({
  setValue,
  customOnUpload,
  filepath,
  useCrop,
  maxFiles: _maxFiles = 10,
} = {}) => {
  let maxFiles = _maxFiles;
  if (useCrop) {
    maxFiles = 1;
  }

  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  // large files state
  const [status, setStatus] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);

  // video state
  const [isUploading, setIsUploading] = useState(false);
  const [isLinkVideo, setIsLinkVideo] = useState(false);

  // crop state
  const [cropFile, setCropFile] = useState({ file: null, preview: null });
  const [modalCrop, setModalCrop] = useState(false);

  /* ######################################## video func ############################*/
  // handle change video upload
  const handleDropVideo = useCallback(async (acceptedFiles) => {
    // disable link video
    setIsLinkVideo(false);

    const formData = new FormData();

    const file = acceptedFiles[0];
    const minSizeFile = 5 * 1024 * 1024;

    if (file.size > minSizeFile) {
      return handleUploadLargeFile(acceptedFiles);
    }

    // upload video
    console.log("running upload video standard size");
    setIsUploading(true);
    formData.append("files", file);
    await API.uploadFile(filepath, formData, (progressEvent) => {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentCompleted);
    })
      .then((res) => {
        const { uploadedFiles, path } = res.data;
        console.log("succes upload file");

        const _uploadedFiles = uploadedFiles?.map((i) => ({ ...i, path }));
        setFileNames(_uploadedFiles);
        if (setValue) {
          setValue(_uploadedFiles);
        }

        return;
      })
      .catch((err) => {
        setIsUploading(false);
        console.log("Err upload video ", err);
        return;
      });
  });

  const handleVideoLink = (type, link) => {
    setIsLinkVideo(true);
    if (type === "link") {
      const uploadedFiles = {
        videoType: "link",
        link,
      };

      setFileNames([uploadedFiles]);
      if (setValue) {
        setValue([uploadedFiles]);
      }
    }
  };

  const handleCancelVideoLink = () => {
    setIsLinkVideo(false);
    setIsUploading(false);
  };
  /* ######################################## video func ############################*/

  /* ################# file func ####################### */

  const handleUploadFile = useCallback(
    async (acceptedFiles) => {
      const formData = new FormData();

      if (useCrop) {
        return acceptedFiles.forEach((file) => {
          const reader = new FileReader();

          reader.onload = () => {
            setCropFile((prev) => ({ ...prev, file: reader.result }));
            setModalCrop(true);
          };

          reader.readAsDataURL(file);
          // setFiles((prev) => [...prev, file]);
          // formData.append("files", file.file, file.filename);
        });
      }

      acceptedFiles.forEach((file) => {
        console.log("file", file);

        setFiles((prev) => [...prev, file]);
        formData.append("files", file);
      });

      if (typeof customOnUpload === "function") {
        customOnUpload(acceptedFiles);
        return;
      }

      // upload files
      await API.uploadFile(filepath, formData)
        .then((res) => {
          const { uploadedFiles, path } = res.data;
          console.log("succes upload file");

          const _uploadedFiles = uploadedFiles?.map((i) => ({ ...i, path }));
          setFileNames(_uploadedFiles);
          if (setValue) {
            setValue(_uploadedFiles);
          }
        })
        .catch((err) => console.log("err file ", err));
    },
    [customOnUpload]
  );

  const handleRemoveFile = (file) => {
    const filteredFiles = fileNames.filter((_file) => _file !== file);
    setFiles(filteredFiles);
    setFileNames([]);
    setCropFile({ file: null, preview: null });

    if (setValue) {
      setValue([]);
    }
  };

  const handleCrop = async (file, blob) => {
    setCropFile((prev) => ({ ...prev, preview: blob, file }));

    const formData = new FormData();

    formData.append("files", file);

    // upload files
    await API.uploadFile(filepath, formData)
      .then((res) => {
        const { uploadedFiles, path } = res.data;
        console.log("succes upload file");

        const _uploadedFiles = uploadedFiles?.map((i) => ({ ...i, path }));
        setFileNames(_uploadedFiles);
      })
      .catch((err) => console.log("err file ", err));
  };

  /* ################# file func ####################### */

  /* handle large file */
  const handleUploadLargeFile = useCallback(async (acceptedFiles) => {
    const uploadChunk = async (chunk, chunkIndex, identifier) => {
      const MAX_RETRIES = 3;

      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("chunkIndex", chunkIndex);
      formData.append("identifier", identifier);

      let attempts = 0;
      while (attempts < MAX_RETRIES) {
        try {
          const result = await API.uploadChunk(filepath, formData);
          console.log("result filename", result);
          const { filename } = result.data;
          filenames.push(filename);
          break;
        } catch (error) {
          attempts++;
          if (attempts >= MAX_RETRIES) {
            console.log("error", error);
            console.log("Upload failed after", attempts, "attempts");
            toast.error(
              "Terjadi Kesalahan saat mengupload! Harap coba beberapa saat lagi :("
            );
            return;
          }
        }
      }
    };

    const file = acceptedFiles[0];
    const minSizeFile = 5 * 1024 * 1024;

    const chunkSize = 3 * 1024 * 1024; // 5MB (adjust based on your requirements)

    if (file.size < minSizeFile) {
      return handleUploadFile(acceptedFiles);
    }

    const totalChunks = Math.ceil(file.size / chunkSize);
    const fileId = `${file.name?.split(".")[0]}-${file.size}-${
      file.lastModified
    }`;

    let filenames = [];
    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
      await uploadChunk(chunk, i, fileId, fileId, filenames);

      console.log(`Uploaded chunk ${i + 1} of ${totalChunks}`);
    }

    const formData = new FormData();
    formData.append("final", true);
    formData.append("totalChunks", totalChunks);
    formData.append("identifier", fileId);
    formData.append("name", `${file.lastModified}-${file.name}`);
    formData.append("filenames", filenames);

    if (filenames.length === totalChunks) {
      await API.uploadFile(filepath, formData).then((res) => {
        const { uploadedFiles, path } = res.data;
        console.log("succes upload file");

        const _uploadedFiles = uploadedFiles?.map((i) => ({ ...i, path }));
        setFileNames(_uploadedFiles);
        if (setValue) {
          setValue(_uploadedFiles);
        }
      });
    }
  }, []);

  const handleCloseCrop = () => {
    setModalCrop(false);
    setFiles([]);
    setCropFile([]);
    setIsLinkVideo(false);
    setIsUploading(false);
  };

  const handleReset = () => {
    setModalCrop(false);
    setFiles([]);
    setCropFile([]);
    setFileNames([]);
  };

  const onSubmitFile = async (path) => {
    const data = new FormData();

    files.forEach((file) => {
      data.append("files", file.file, file.filename);
    });

    await API.uploadFile(path, data)
      .then((res) => {
        const { uploadedFiles } = res.data;
        console.log("succes upload file");

        setFileNames(uploadedFiles);
      })
      .catch((err) => console.log("err file ", err));
  };

  return {
    maxFiles,
    files,
    fileNames,
    cropFile,
    modalCrop,
    filepath,
    isUploading,
    isLinkVideo,
    status,
    progress,

    setFileNames,
    handleUploadLargeFile,
    handleReset,
    handleCloseCrop,
    handleDropVideo,
    handleVideoLink,
    handleCancelVideoLink,
    setFileNames,
    handleCrop,
    handleUploadFile,
    handleRemoveFile,
    onSubmitFile,
  };
};

useUploadFile.propTypes = {
  setValue: PropTypes.func,
  customOnUpload: PropTypes.func,
  filepath: PropTypes.string,
  useCrop: PropTypes.bool,
  // maxFiles: PropTypes.number
};

useUploadFile.defaultProps = {
  setValue: undefined,
  customOnUpload: undefined,
  filepath: "",
  useCrop: false,
  // maxFiles: 10
};

export default useUploadFile;
