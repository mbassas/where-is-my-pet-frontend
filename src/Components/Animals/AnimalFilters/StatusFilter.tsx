import * as React from "react";
import { EAnimalStatus } from "../../UploadAnimalForm/UploadAnimalForm";
import { FormControl, InputLabel, Select, makeStyles, Theme, createStyles } from "@material-ui/core";

interface IProps {
    value: EAnimalStatus | undefined;
    onChange: (value: EAnimalStatus | undefined) => void;
}

function StatusFilter({value, onChange }: IProps) {
    const classes = useStyles();
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
            <Select
                native
                value={value}
                onChange={(e) => {
                    onChange(e.currentTarget.value as EAnimalStatus);
                }}
                label="Status"
            >
                <option aria-label="Lost or Found" value={undefined}>Lost or Found</option>
                <option aria-label="Lost" value={EAnimalStatus.LOST}>Lost</option>
                <option aria-label="Found" value={EAnimalStatus.FOUND}>Found</option>

            </Select>
        </FormControl>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {            
            margin: `${theme.spacing(1)}px 0`,
            width: "100%"
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);
export default StatusFilter;