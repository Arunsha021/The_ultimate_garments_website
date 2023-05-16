import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
    mainContainer: {
        width: '100wh',
        height: '100vh',
        background:'#f5f6fa',
        display: 'flex',
        justifyContent: 'center',

    },
    box: {
        width: '80%',
        height: '70%',
        background: '#fff',
        borderRadius: 5,
        marginTop:'2%',
    },
    headingText: {
        fontSize: 18,
        fontWeight: 700,
        padding: 2,
        margin: 3,
        color: '#636e72'
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
