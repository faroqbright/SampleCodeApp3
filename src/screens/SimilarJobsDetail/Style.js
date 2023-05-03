import { Dimensions } from "react-native";
import { Colors } from "../../utils/Colors";

export const Style={
    mainContainer:{
        flex:1,
        backgroundColor:Colors.White
    },
    headerMainContainer:{
        // height:150,
        // backgroundColor:'red',
    },
    DescriptionHeading:{
        fontSize:16,
        color:Colors.DarkBlue,
        fontFamily:'Roboto-Bold',
        marginBottom:10
    },
    QualificationsHeading:{
        fontSize:16,
        color:Colors.DarkBlue,
        fontFamily:'Roboto-Bold',
        marginTop:15,
        marginBottom:10
    },
    VideoHeading:{
        fontSize:16,
        color:Colors.DarkBlue,
        fontFamily:'Roboto-Bold',
        marginTop:15,
        marginBottom:10
    },
    videoContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    SkillsRequiredtionHeading:{
        fontSize:16,
        color:Colors.DarkBlue,
        fontFamily:'Roboto-Bold',
        marginTop:15,
        marginBottom:10
    },
    secondContainer:{
        padding:20,
    },
    description:{
        color:Colors.DarkGray,
        fontFamily:'Roboto-Regular',
        fontSize:16
    },
    videoDescription:{
        color:Colors.DarkGray,
        fontFamily:'Roboto-Regular',
        fontSize:16,
        marginLeft:5,
        // backgroundColor:'red',
        width:'80%',
        height:'auto',
        justifyContent:'center'
    },
    applyButton:{
        backgroundColor:Colors.LightBlue,
        width:'100%',
        height:44,
        marginTop:100,
        // marginBottom:'auto',
        borderRadius:10
    },
    applyButtonText:{
        fontFamily:'Roboto-Bold',
        fontSize:16,
        color:Colors.White,
        textAlign:'center',
        
    }
}