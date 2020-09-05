import React from 'react';
import { makeStyles } from '@material-ui/core';
import AddPhotoIcon from "@material-ui/icons/AddAPhotoOutlined"
import { useFormikContext } from 'formik';
import { IAnimalFormValues } from '../UploadAnimalForm';
interface IProps {
    className?: string;
    onChange?: (image: File, image_preview: string) => void;
}
function AnimalImageInput({className = "", onChange}: IProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const classes = useStyles();
    const [preview, setPreview] = React.useState<string>("");

    function onChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        if (!e.target.files?.length) {
            return;
        }

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setPreview(reader.result);
                if (onChange) {
                    onChange(file, reader.result);
                }
                
            }
        }
        
        reader.readAsDataURL(file);
    }
    
    return (
        <div className={`${classes.wrapper} ${className}`}>
            <div 
                className={`${classes.previewWrapper}`}
                onClick={() => inputRef.current?.click()}
            >
                {!preview && <AddPhotoIcon fontSize="large" color="disabled"/>}
                {preview && (
                    <img src={preview} className={classes.preview} />
                )}
            </div>
            <input 
                onChange={onChangeImage}
                ref={inputRef}
                className={classes.input}
                type="file"
                accept="image/*"
            />
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: ".5rem",
        marginBottom: "1rem"
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
    },
    previewWrapper: {
        width: "100%",
        height: "24rem",
        flexGrow: 1,
        border: `1px dashed ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.grey[100],
        cursor: "pointer"
    },
    preview: {
        maxWidth: "100%",
        maxHeight: "100%",
    }
}))

export default AnimalImageInput;
