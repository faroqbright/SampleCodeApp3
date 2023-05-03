import { Dimensions } from "react-native"
import { Colors } from "../../utils/Colors"
export const Style ={
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // paddingHorizontal:20
    },
    headerContainer: {
        width:'100%',
        height: 80, 
        marginBottom: 0,
        justifyContent: 'space-between', flexDirection: 'row', 
        backgroundColor:Colors.White,
        // backgroundColor:'red'
    },
    headerIcon: {
        width:50,
        height:80,
        marginLeft: 5,
        alignSelf: 'center',
        // backgroundColor:'blue'
    },
    headerTextStyle: {
        textAlign:'center',
        // backgroundColor:'red',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:35,
        width:'50%',
    },
    mainHeading: {
        width: '100%',
        height: 92,
        alignSelf: 'center',
        alignItems: "center",
        flexDirection:'row',
        
        
    },
    mainHeadingText: {
        color: '#0F0A39',
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        justifyContent:'center', 
        marginLeft:45
    },
    textContainer: {
        // marginVertical:20,
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        // backgroundColor:'yellow',
        // padding:9.5
    },
    innerText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color:'#7B7890',
        // padding:5,
        width:'90%'
        
    },
    resetInput:{
        justifyContent:'center', 
        fontFamily:'Roboto-Regular',
    }
}