import { Dimensions } from "react-native"
import { Colors } from "../../utils/Colors"
export const Style = {
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizental: 10,
        backgroundColor: Colors.White
    },
    headerContainer: {
        justifyContent: 'center',
        width: '100%',
        height: 'auto'
    },
    imageHeader: {
        width: Dimensions.get('window').width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoHeader: {
        justifyContent: 'center',
        width: 157,
        height: 45,
        alignItems: 'center'

    },
    signInHeading: {
        justifyContent: 'center',
        margin: 25,
        width: '100%',
        height: 50,
        
    },
    signInText: {
        fontSize: 32,
        color: Colors.DarkBlue,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        marginVertical:20
    },
    inputStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.InputField,
        backgroundColor: Colors.InputField,
        width: '90%',
        height: 55,
        marginTop: 10
    },
    passwordInputView: {
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#F5F6FA',
        backgroundColor: '#F5F6FA',
        width: 319,
        height: 44,
        margin: 10
    },
    sociaButtonsContainer: {
        flexDirection: 'row', 
        width: '90%', 
        justifyContent: 'space-between', 
        alignSelf: 'center', 
        alignItems: 'center'
    }
}
