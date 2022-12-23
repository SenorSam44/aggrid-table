import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
        whiteSpace: "pre-wrap",

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
    const gridRef = useRef();
    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
        };
    }, []);
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [fieldList, setFieldList] = useState([]);

    useEffect(() => {
        // setting row data
        processingRowData()

        // setting column data
        const column_property_list = processColumnLabelList(props.labelMap)
        setColumnDefs(column_property_list)
    }, [props.gridData, props.labelMap]);

    // converts input into field list and row data
    const processingRowData = () => {
        let rowDataList = []
        let field_list = []
        for (const axis in props.gridData) {
            for (const sliceNumber in props.gridData[axis]) {
                let [field_list, total_labeled, rowDataCell] = prepareRowDataWithLabel(axis, sliceNumber, props.gridData[axis][sliceNumber], props.labelMap)

                field_list = [...field_list, ...fieldList]
                rowDataCell["total labeled"] = total_labeled
                rowDataList.push(rowDataCell)
            }
        }
        setFieldList([...new Set(field_list)])
        setRowData(rowDataList)
    }

    const prepareRowDataWithLabel = (axis, sliceNumber, sliceData, labelMap) => {
        let row_data_cell = {slice: `${axis === "crosslines" ? "Xline" : axis.charAt(0).toUpperCase() + axis.slice(1, -1)} ${sliceNumber}`} // changes 'inlines' -> 'Inline', 'crosslines' -> 'Xline'
        let total_labeled = 0.00
        let field_names = []
        for (const value in sliceData) {
            if (labelMap[value] && labelMap[value]['name']) {
                field_names.push(labelMap[value]['name'])
                row_data_cell[labelMap[value]['name']] = sliceData[value]
                total_labeled += sliceData[value]
            }
        }
        return [field_names, total_labeled, row_data_cell]
    }
    const processColumnLabelList = (labelMap) => {
        let column_property_list = [{field: 'slice'}, {
            field: 'total labeled',
            cellStyle: totalChangeCellStyle,
            valueFormatter: percentageFormatter
        }]

        for (const label in labelMap) {
            if (fieldList.includes(labelMap[label]['name'])) {
                // include field name and color in the column property
                column_property_list.push({
                    field: labelMap[label]['name'],
                    headerComponentParams: {
                        color: labelMap[label]['color'],
                    },
                    cellStyle: changeCellStyle,
                    valueFormatter: percentageFormatter
                })
            }
        }

        return column_property_list
    }

    useEffect(() => {
        // resizing the columns according to the label width
        setTimeout(() => {
            autoSizeAll()
        }, 400)
    })

    // setting the cell colors for total label column
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

    // setting the cell colors for cells
    const changeCellStyle = params => {
        if (params.value > 0.5) {
            return {color: "red"};
        }
        return null;
    }

    const percentageFormatter = params => {
        return `${((params.value ? params.value : 0) * 100).toFixed(2)}%`
    }

    // custom header; a circle and the label
    const AgCustomHeader = (props) => {
        const classes = useStyles()
        return (
            <div className={classes.customHeaderLabel}>
                {
                    props.color ?
                        <span className={classes.headerCircle} style={{background: "#" + props.color}}/> : null
                }
                {props.displayName}
            </div>
        );
    };

    // auto resizing the columns
    const autoSizeAll = useCallback(() => {
        const allColumnIds = [];
        gridRef.current.columnApi.getColumns().forEach((column) => {
            allColumnIds.push(column.getId());
        });
        gridRef.current.columnApi.autoSizeColumns(allColumnIds);
    }, []);


    return (
        <div className={[classes.gridContainer, "ag-theme-material"].join(" ")}
             style={{height: '35vh', background: "white"}}>
            <AgGridReact
                ref={gridRef}
                defaultColDef={defaultColDef}
                frameworkComponents={{agColumnHeader: AgCustomHeader}}
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
};

export default AgGridTable;