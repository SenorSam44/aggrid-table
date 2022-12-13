import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    customHeaderLabel: {
        fontSize: "18px",

    },
    headerCircle: {
        content: "''",
        marginRight: "5px",
        width: "14px",
        height: "14px",
        borderRadius: "10px",
        display: "inline-block",
    }
});

const AgCustomHeader = (props) => {
    const classes = useStyles()
    useEffect(()=> {
        console.log(props)
    })
    return (
        <div className={classes.customHeaderLabel}>
            {
                props.color? <span className={classes.headerCircle} style={{background: "#" + props.color}}/> : null
            }
            {props.displayName}
        </div>
    );
};

export default AgCustomHeader;