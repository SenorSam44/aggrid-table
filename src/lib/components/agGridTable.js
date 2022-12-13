import React, { useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const useStyles = makeStyles({
    gridContainer: {
        width: "100%",
        height: "100%",
        borderTop: "1px solid #e2e2e2",
        "&.ag-theme-material .ag-header": {
            backgroundColor: '#8D8D8D',
            minHeight: "50px!important",
        },
        "&.ag-theme-material .ag-header .ag-header-row": {
            height: "100%!important",
        },
        "&.ag-theme-material .ag-header-container .ag-header-cell, &.ag-theme-material .ag-cell": {
            borderRight: "2px solid black",
        },
        "&.ag-theme-material .ag-header-cell": {
            justifyContent: "center",
            textAlign: "center"
        },
        "&.ag-theme-material .ag-header-cell-comp-wrapper": {
            justifyContent: "center"
        },
        "&.ag-theme-material .ag-header-cell .ag-header-cell-label": {
            flex: "unset",
        },
        // Have to use !important as .ag-header-cell has high specificity and couldn't be easily changed by nesting multiple classes
        "&.ag-theme-material .ag-header-cell:hover": {
            backgroundColor: `gray !important`
        },
        "&.ag-theme-material .ag-row:nth-child(even)": {
            backgroundColor: '#CDCDCD'
        },
        "&.ag-theme-material .ag-row.ag-row-focus .ag-cell.ag-cell-focus.status-cell-focus:focus": {
            borderColor: "transparent"
        },
        "&.ag-theme-material .ag-row.ag-row-focus .ag-cell.ag-cell-focus.action-cell-focus:focus": {
            borderColor: "transparent",
            borderLeftColor: "rgba(226,226,226)"
        },
        "&.ag-theme-material .ag-header-cell .ag-header-cell-resize": {
            borderLeft: "2px solid #888",
            top: "19px",
            height: "16px"
        },
    },
    customHeaderLabel: {
        fontSize: "18px",
        whiteSpace: "pre-wrap"

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

const AgGridTable = (props) => {
    const classes = useStyles();
    useEffect(() => {
        // setting row data
        let rowDataList = []
        let fieldList = []
        for (const axis in props.gridData) {
            for (const sliceNumber in props.gridData[axis]) {
                let rowDataCell = {slice: `${axis==="crosslines"? "Xline": axis.charAt(0).toUpperCase() + axis.slice(1, -1)} ${sliceNumber}`}
                let total_labeled = 0.00
                for (const value in props.gridData[axis][sliceNumber]) {
                    if (props.labelMap[value] && props.labelMap[value]['name']) {
                        if(!fieldList.includes(props.labelMap[value]['name'])){
                            fieldList.push(props.labelMap[value]['name'])
                        }
                        rowDataCell[props.labelMap[value]['name']] = props.gridData[axis][sliceNumber][value]
                        total_labeled += props.gridData[axis][sliceNumber][value]
                    }
                }
                rowDataCell["total labeled"] = total_labeled
                rowDataList.push(rowDataCell)
            }
        }
        setRowData(rowDataList)
        // setting column data
        let columnPropertyList = [{field: 'slice'}, {
            field: 'total labeled',
            cellStyle: totalChangeCellStyle,
            valueFormatter: percentageFormatter
        }]

        for (const label in props.labelMap) {
            if(fieldList.includes(props.labelMap[label]['name'])){
                columnPropertyList.push({
                    field: props.labelMap[label]['name'],
                    headerComponentParams: {
                        color: props.labelMap[label]['color'],
                    },
                    cellStyle: changeCellStyle,
                    valueFormatter: percentageFormatter
                })
            }
        }
        setColumnDefs(columnPropertyList)
    }, [props.gridData, props.labelMap]);

    const [rowData, setRowData] = useState([]);

    // setting the cell colors
    const totalChangeCellStyle = params => {
        if (params.value < 0.5) {
            return {color: "red"};
        } else if (params.value > 0.5 && params.value < 0.9) {
            return {color: "yellow"}
        } else if (params.value >= 0.9) {
            return {color: "green"};
        }
        return null;
    }

    const changeCellStyle = params => {
        if (params.value > 0.5) {
            return {color: "red"};
        }
        return null;
    }

    const percentageFormatter = params => {
        return `${((params.value? params.value: 0) * 100).toFixed(2)}%`
    }
    const [columnDefs, setColumnDefs] = useState([]);

    const AgCustomHeader = (props) => {
        const classes = useStyles()
        return (
            <div className={classes.customHeaderLabel}>
                {
                    props.color? <span className={classes.headerCircle} style={{background: "#" + props.color}}/> : null
                }
                {props.displayName}
            </div>
        );
    };

    return (
        <div className={[classes.gridContainer, "ag-theme-material"].join(" ")}
             style={{height: '35vh', background: "white"}}>
            <AgGridReact
                frameworkComponents={{ agColumnHeader: AgCustomHeader }}
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
};

export default AgGridTable;