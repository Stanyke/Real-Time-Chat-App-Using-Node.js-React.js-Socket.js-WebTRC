export const DashboardStyle = (theme) => {
    return {
        root: {
            flexGrow: 1,
            display: 'grid',
            gridTemplateColumns: '35% 65%',
            marginTop: '50px',

            "@media (max-width: 700px)": {
                gridTemplateColumns: "100%"
            }
        },
        box: {
            width: '90%',
            justifySelf: 'center',
        },
        leftSide: {
            height: '500px',
            maxHeight: '500px',
            overflow: 'auto',

            '&::-webkit-scrollbar': {
                width: "0.4em"
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: "inset 0 0 5px grey",
                borderRadius: "10px",
            },
            '&::-webkit-scrollbar-thumb': {
                background: "tomato",
                borderRadius: "10px",
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: "#d33939",
            },

            "@media (max-width: 700px)": {
                height: '300px',
                maxHeight: '300px',
            },
        },
        titleBar: {
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            fontFamily: 'Cursive'
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            background: '#c8d4e4',
            marginBottom: '10px',
        },
        rightPaper: {
            height: 'calc(100vh - 120px)',
            border: '1px solid white',
        },
        singleChat: {
            cursor: 'pointer'
        },
        emptyItem: {
            textAlign: 'center'
        }
    }
}