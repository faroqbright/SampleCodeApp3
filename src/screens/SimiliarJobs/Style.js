import { Colors } from "../../utils/Colors";

export const Style = {
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.White,
        
    },
    headerContainer: {
        height: 80, marginBottom: 10,
        justifyContent: 'space-between', flexDirection: 'row', 
        // backgroundColor:Colors.White
        // backgroundColor:'red',
        width:'100%'
    },
    headerIcon: {
        marginLeft: 0,
        width:70,
        alignSelf: 'center',
        // backgroundColor:'yellow'
    },
    headerTextStyle: {
        textAlign:'center',
        // marginRight: '30%',
        // marginLeft:10
    },
    appliedFlatList: {
        height: '100%',
        marginBottom:10,
    },
    appliedJobContainer: {
        shadowColor: Colors.White,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,

        // elevation: 1,
        width: '90%',
        height: 120,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.LightGray,
        marginTop: 5,
        marginHorizontal: 20,
        justifyContent: 'center'
    },

    textContainer2: {
        marginTop: 15,
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatarCircle2: {
        backgroundColor: Colors.LightGray,
        borderRadius: 30,
        borderColor: Colors.LightGray,
        borderWidth: 1,
        width: 58,
        height: 58,

    },
    itemText1: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        marginLeft: 30,
    },
    subText1: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.LightGray,
        marginLeft: 30
    },
    dateStyle: {
        fontFamily: 'Roboto-Medium',
        color: Colors.LightGray,
        fontSize: 10,
        marginLeft: 30
    },
    appliedButton: {
        backgroundColor: Colors.White,
        width: 100,
        height: 30,
        marginTop: 0,
        marginLeft: 280,
        justifyContent: 'center'
    },
    appliedButtonText: {
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        color: Colors.LightBlue,
        fontSize: 12,

    },
    appliedButtonIconStyle: {
        width: 20,
        height: 20,
        marginRight: 80

    }
}