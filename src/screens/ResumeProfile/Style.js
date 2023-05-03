import { Colors } from "../../utils/Colors"
export const Style = {
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizental: 10,
        backgroundColor: Colors.White
    },
    headlineText:{
        fontFamily:"Roboto-Bold",
        fontSize:20,
        color:Colors.DarkGray

    },
    headingContainer:{
        width:'90%', 
        marginTop:10,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignSelf:'center'
    },
    editButtonStyle:{
        backgroundColor:Colors.White,
        borderColor:Colors.White,
        height:24,
        width:44,
        justifyContent:'center',
        alignItems:'center'
    },
    editButtonTextStyle:{
        fontFamily:'Roboto-Bold',
        fontSize:14,
        color:Colors.LightBlue
    },
    uploadField:{
        backgroundColor:'#F5F6FA',
        marginTop:10,
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    uploadFieldText:{
        fontSize:16,
        textAlign:'justify',
        fontFamily:'Roboto-Regular',
        marginRight:'auto',
        color:'#CBC9D9',
    },
    iconStyle:{
        marginRight:10,
        marginBottom:18
    },
    fileIconStyle:{
        marginLeft:10,
        marginRight:10,
    },
    flatList: {
        borderRadius:20,    
        width: '100%',
        height: 48,
        marginTop:5,
        marginLeft:18
        
        
    },
    item: {
        width:120,
        height:30,
        justifyContent:'space-evenly',
        flexDirection:'row',
        textAlign:'center',
        alignSelf:'center',
        alignItems:'center', 
        // padding:5,
        backgroundColor:Colors.LightBlue,
        marginHorizontal: 5,
        borderRadius:10,

    },
    jobItem: {
        width:120,
        height:30,
        justifyContent:'space-evenly',
        flexDirection:'row',
        textAlign:'center',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:Colors.Yellow,
        marginHorizontal: 5,
        borderRadius:20,

    },
    title: {
        fontSize: 12,
        fontFamily: 'Roboto-Bold'
    },
    jobTitle: {
        fontSize: 12,
        fontFamily: 'Roboto-Bold'
    },
    flatListContainer:{
        width:'100%',
        borderBottomWidth:0.5,
        borderColor:Colors.LightGray,
        // backgroundColor:'red'
    },
    pickerContainer:{
        // backgroundColor:Colors.InputField,
        // backgroundColor:'red',
        width:'90%',
        height:44,
        // borderBottomWidth:0.5,
        borderColor:Colors.InputField,
        borderRadius:10,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        marginBottom:10
    },
    // flatList: {
    //     borderRadius:20,    
    //     width: '100%',
    //     height: 48,
    //     marginTop:5,
    //     marginLeft:18
        
        
    // },
    pickerStyle:{
        width:'90%',
        height:50,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginRight:20
    },
}