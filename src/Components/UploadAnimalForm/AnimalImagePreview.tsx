import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { IAnimalFormValues } from './UploadAnimalForm';
interface IProps {
    className?: string;
}
function AnimalImagePreview({className = ""}: IProps) {
    const classes = useStyles();
    const [preview, setPreview] = React.useState<string>("");
    const {values} = useFormikContext<IAnimalFormValues>();

    React.useEffect(() => {
        if (!values.images) {
            setPreview("");
            return;
        }

        const reader = new FileReader();        

        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setPreview(reader.result);                     
            }
        }
        
        reader.readAsDataURL(values.images);

    }, [values.images])
    
    return (
        <div className={`${classes.wrapper} ${className}`}>
            <div 
                className={`${classes.previewWrapper}`}
            >
                {preview && (
                    <img src={preview} className={classes.preview} />
                )}
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
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
        // cursor: "pointer"
    },
    preview: {
        maxWidth: "100%",
        maxHeight: "100%",
    }
}))

export default AnimalImagePreview;
