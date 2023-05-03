
import { Colors } from "../../utils/Colors";
export const Style ={
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // paddingHorizontal:30,
        
    },
    headerContainer: {
        height: 80, marginBottom: 0,
        justifyContent: 'space-between', flexDirection: 'row', 
        backgroundColor:Colors.White,
        // backgroundColor:'red'
    },
    headerIcon: {
        marginLeft: 1,
        alignSelf: 'center'
    },
    headerTextStyle: {
        textAlign:'center',
        // backgroundColor:'red',
        marginLeft:8,
        marginBottom:5,
        marginRight:80,
        width:200,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
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
        marginLeft:30,
        justifyContent:'center',
        textAlign:'center',
        marginRight:20,
    },
    textContainer: {
        width: '100%',
        height: 120,
        marginTop:20,
        // marginBottom:0,
        padding:20,
        textAlign:'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        // backgroundColor:'yellow'
    },
    innerText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color:'#7B7890',
        
    },
    codeContainer:{
        width:'90%',
        height:100,
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:Colors.White,
        // backgroundColor:'red',
        // margin:50,
        // backgroundColor:'red',
        // paddingHorizontal:80,
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    inputContainer:{
        borderColor:Colors.DarkGray
    },
    codeInput:{
        color:Colors.LightBlue,
        fontSize:20,
        justifyContent:'center',
    },
    resendTextContainer:{
        justifyContent:'space-between',
        flexDirection:'row',
        width:'100%',
        // backgroundColor:'red',
        paddingHorizontal:20
    },
    reciveCodeText:{
        color:Colors.DarkGray,
        fontFamily:'Roboto-Regular',
        fontSize:14,
        
    },
    ResendString:{
        color:Colors.LightBlue,
        fontFamily:'Roboto-Bold',
        fontSize:14
    },
    sendButton:{
        backgroundColor:Colors.LightBlue,
        width:'90%', 
        height:44,    
        justifyContent:'center',
        alignSelf:'center',
        marginTop:'auto',
        marginBottom:20
    },
    buttonTextStyle:{
        color:Colors.White,
        textAlign:'center',
        fontFamily:'Roboto-Bold',
        fontSize:16
    },
}