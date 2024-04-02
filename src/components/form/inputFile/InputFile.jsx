import { useRef } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import "./inputFile.scss";

import Button from "../../button/Button";

import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const InputFile = (props) => {
    const { label, name, accept, multiple, formik, error, errorMessage } = props;

    const inputFileRef = useRef(null);

    const refreshFiles = (selectedFiles) => {
        formik.setFieldValue(name, selectedFiles);
    };

    const removeFile = (indexToDelete) => {
        const filteredFiles = Array.from(formik.values[name]).filter((file, index) => index !== indexToDelete);
        refreshFiles(filteredFiles);
    };

    const handleOnDragOverFile = (event) => {
        event.preventDefault();
    };

    const handleOnDropFile = (event) => {
        event.preventDefault();
        const selectedFiles = Array.from(event.dataTransfer.files).filter((file) => accept.includes(file.type));
        refreshFiles((selectedFiles.length > 0 && !multiple) ? [selectedFiles[0]] : selectedFiles);
    };

    const handleOnChangeFile = (event) => {
        const selectedFiles = Array.from(event.target.files).filter((file) => accept.includes(file.type));
        refreshFiles((selectedFiles.length > 0 && !multiple) ? [selectedFiles[0]] : selectedFiles);
    };

    const handleFileClick = (event) => {
        // Prevent the default action to avoid form submission
        event.preventDefault();
        // Trigger the click event of the input file
        inputFileRef.current.click();
    };

    return (
        <Box className="input-file">
            <Box>
                <Box
                    className={`input-file__drop-zone ${error && "input-file__drop-zone--invalid"}`}
                    id="drop-zone"
                    onDragOver={handleOnDragOverFile}
                    onDrop={handleOnDropFile}
                    onClick={handleFileClick}
                >
                    {formik.values[name]?.map((file, index) => (
                        <Box
                            key={index}
                            className="input-file__drop-zone__file">
                            <InsertDriveFileOutlinedIcon/>
                            <span>{file.name}</span>
                            <span>{`${(file.size / 1024).toFixed(1)}KB`}</span>
                            <DeleteIcon onClick={() => removeFile(index)}/>
                        </Box>
                    ))}
                    {formik.values[name]?.length <= 0 && (
                        <span className="input-file__drop-zone__text">
                            {`Arrastrá y soltá ${multiple ? "tus archivos" : "tu archivo"} aquí`}
                        </span>
                    )}
                    <Button>
                        {`Seleccionar ${multiple ? "Archivos" : "Archivo"}`}
                    </Button>
                </Box>
                <span className="input-file__label">{label}</span>
                <input
                    type="file"
                    accept={accept.join()}
                    multiple={multiple}
                    id={name}
                    name={name}
                    ref={inputFileRef}
                    onChange={handleOnChangeFile}
                    style={{ display: "none" }}
                />
            </Box>
            {error && <span className="input-file__error">{errorMessage}</span>}
        </Box>
    );
};

InputFile.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    accept: PropTypes.arrayOf(PropTypes.string).isRequired,
    multiple: PropTypes.bool,
    formik: PropTypes.object.isRequired,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
};

InputFile.defaultProps = {
    label: "",
    multiple: false,
    errorMessage: "",
};

export default InputFile;