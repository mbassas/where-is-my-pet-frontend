import React from "react";
import { TextFieldProps, InputAdornment, IconButton, TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function PasswordInput(props: TextFieldProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const showPasswordButton = (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => { e.preventDefault(); }}
            >
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    )

    return (
        <TextField {...props} type={showPassword ? "text" : "password"} InputProps={{ endAdornment: showPasswordButton }} />
    )
}

export default PasswordInput;
