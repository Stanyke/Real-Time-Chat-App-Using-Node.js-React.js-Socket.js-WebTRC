export const DashboardStyle = (theme) => {
    return {
        root: {
            flexGrow: 1,
            display: 'grid',
            gridTemplateColumns: '35% 65%',
            marginTop: '50px'
        },
        box: {
            width: '90%',
            justifySelf: 'center',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }
}