import { Dimensions } from "react-native"
import { Colors } from "../../utils/Colors"
export const Style={
    mainContainer:{
        flex:1,
        backgroundColor:Colors.White
    },
    headerContainer:{
        backgroundColor:Colors.White,
        height: 80, 
        marginTop:5,
        width:Dimensions.get("window").width,
        marginBottom: 1,
        justifyContent: 'space-between', 
        flexDirection: 'row',
        // backgroundColor:'black'
    },
    backButtonStyle:{
        marginLeft:20,
        marginTop:25,
        width:30,
        height:30,
        // backgroundColor:'red'
    },
    headerTextStyle:{
        // marginLeft:'40%',
        marginLeft:30,
        // backgroundColor:'blue',
        width:150,
        height:30,
        // alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        marginBottom:10           
    },
    settingButtonStyle:{
        marginLeft:30,
        // marginTop:'auto',
        justifyContent:'center',
        alignSelf:'center',
        height:30,
        width:30,
        // backgroundColor:'blue'
    },
    jobFlatList: {
        // width:width+5,
        width:"100%",
        height:'100%',
        // borderBottomWidth: 0.5,
        borderColor:Colors.LightGray,
        justifyContent:'center',
        alignItems:'center', 
        backgroundColor:Colors.White,
        // backgroundColor:'red'
    },
}