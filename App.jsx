import React, {useState, useRef, useEffect} from 'react';
import {Text} from 'react-native';
import {View, ScrollView, FlatList, SectionList, VirtualizedList} from 'react-native';
import {Button, Pressable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Image, ImageBackground} from 'react-native';
import {TextInput, KeyboardAvoidingView} from 'react-native';

import {Animated, Easing, PanResponder,Switch, RefreshControl, StatusBar, ActivityIndicator, Modal, Alert, Linking} from 'react-native';
import {BackHandler,Dimensions, Platform, Vibration, PermissionsAndroid, ToastAndroid} from 'react-native';
import WebView from 'react-native-webview';

import $ from 'jquery';


// export default ()=>{
//   return <WebView source={{uri:"https://www.naver.com"}} />
// }


export default ()=>{
  let web = useRef(null);
  let [data,dataC] = useState("");

  BackHandler.addEventListener("hardwareBackPress",(e)=>{
    web.postMessage("back");
    return true
  });
  return <WebView
    ref={(_ref)=>web=_ref}
    onMessage={()=>{
      dataC(data);
    }}
    originWhitelist={["*"]}
    javaScriptEnabled={true}
    injectedJavaScriptObject={{title:"제목",body:"내용"}}
    injectedJavaScript={`
      document.addEventListener("message",(e)=>{
        if(e.data =="back"){
          window.history.back();
        }
        else window.ReactNativeWebView.postMessage(parseInt(e.data) + 2);
      })
    `}
    source={{uri:"http://192.168.6.21:8016/Members"}}
    renderLoading={()=><View><Text>로딩중</Text></View>}
    startInLoadingState
    renderError={()=><View><Text>에러</Text></View>}
    />
  }


// export default ()=>{
//   let [v, vc] = useState(0);
//   let [history, historyChanger] = useState([]);
//   let listen = BackHandler.addEventListener("hardwareBackPress", ()=>{
//     if(history.length < 1) return true;
//     let [h, ...his] = history;
//     vc(h);
//     historyChanger(his);
//     return true;
//   });

//   // TodoList

//   // 좌표
//   // let window = Dimensions.get('window');
//   // let screen = Dimensions.get("screen");
//   // if(Platform.isPad){}
//   // else{}
//   // let data = Platform.select({
//   //   android:"안드로이드일때",
//   //   ios:"아이폰일때"
//   // })
//   // Android의 기능 -> BH, Toast, Permission
//   // 0.72 -> 0.63
//   return <View>
//     <Button title="랜덤" onPress={()=>{
//       vc(parseInt(Math.random() * 50));
//       historyChanger([v, ...history]);
//     }}/>
//     <Text>{v}</Text>
//     {/* <Button title="토스트" onPress={async () => {
//       // ToastAndroid.showWithGravityAndOffset("보여줄 메시지", ToastAndroid.SHORT, ToastAndroid.TOP, 500, 500)
//       // ToastAndroid.showWithGravity("왜", ToastAndroid.SHORT, ToastAndroid.TOP);
//       // ToastAndroid.show("보여줄 메시지", ToastAndroid.LONG);
//       // if(PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)){}

//       // PermissionsAndroid.requestMultiple(
//       //   [
//       //     PermissionsAndroid.PERMISSIONS.CAMERA,
//       //     PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
//       //   ]
//       // )

//       // 2단계 -> 권한 확인, 권한 부여
//       // let result = await PermissionsAndroid.request(
//       //   PermissionsAndroid.PERMISSIONS.CAMERA,{
//       //   title:"제목",
//       //   message:"메시지",
//       //   buttonNeutral:"취소",
//       //   buttonNegative:"거부",
//       //   buttonPositive:"허용",
//       // });
//       // if(result != PermissionsAndroid.RESULTS.GRANTED);
//       // if(result != PermissionsAndroid.RESULTS.DENIED);
//       // if(result != PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN);
//     }}/> */}
//     {/* <Button title="진동" onPress={()=>{
//       // Vibration.vibrate(); // 1번
//       // Vibration.vibrate(3000); // ms 시간동안
//       // Vibration.vibrate("wait 1s, vibrate, wait 3s, vibrate 2s"); // 패턴 대로
//       // wait, vibrate, wait, vibrate, ...
//       Vibration.vibrate([2, 3, 4], true);
//     }}/>
//     <Button title="끝내기" onPress={()=>{
//       Vibration.cancel();
//     }}/> */}
//     {/* <Text>{data}</Text> */}
//     {/* <Text>{JSON.stringify(window)}</Text>
//     <Text>{JSON.stringify(screen)}</Text> */}
//   </View>
// }

// export default ()=>{

//   // gestureState
//   // stateID - 상태 번호
//   // numberActiveTouches - 개수
//   // moveX, moveY - 이전 x, 이전 y로부터 변화한 x,y
//   // x0, y0 - 좌표
//   // dx, dy - 누적 거리
//   // vx, vy - 속도
//   // let [a,b] = useState(0);
//   let angle = useRef(new Animated.Value(0)).current;
//   let [a,v] = useState(0);
//   let pan = PanResponder.create({
//     onMoveShouldSetPanResponder:()=>true,
//     onPanResponderMove:(e,g)=>{
//       angle.setValue(g.dx + g.dy);
//       v(g.dx + g.dy);
//     },
//     onPanResponderRelease:()=>{
//       angle.extractOffset();
//     }
//   });
//   return <View>
//     <Text>{parseInt(JSON.stringify(angle))}</Text>
//     <Animated.View
//     style={{transform:[{rotate:`${a}deg`}]}}
//     {...pan.panHandlers}>
//       <View style={{width:300, height:300, backgroundColor:"red"}}/>
//     </Animated.View>
//   </View>
// }

// // View, Text, ScrollView, FlatList, SectionList, Image 태그들만 Animated에 존재

// // onMoveShouldSetPanResponder: (e, gestureState) => {...}
// // onMoveShouldSetPanResponderCapture: (e, gestureState) => {...}
// // onStartShouldSetPanResponder: (e, gestureState) => {...}
// // onStartShouldSetPanResponderCapture: (e, gestureState) => {...}
// // onPanResponderReject: (e, gestureState) => {...}
// // onPanResponderGrant: (e, gestureState) => {...}
// // onPanResponderStart: (e, gestureState) => {...}
// // onPanResponderEnd: (e, gestureState) => {...}
// // onPanResponderRelease: (e, gestureState) => {...}
// // onPanResponderMove: (e, gestureState) => {...}
// // onPanResponderTerminate: (e, gestureState) => {...}
// // onPanResponderTerminationRequest: (e, gestureState) => {...}
// // onShouldBlockNativeResponder: (e, gestureState) => {...}

// // 한개 클릭으로 드래그시 사각형 박스가 회전하는 애니메이션

// // export default ()=>{

// //   // gestureState
// //   // stateID - 상태 번호
// //   // numberActiveTouches - 개수
// //   // moveX, moveY - 이전 x, 이전 y로부터 변화한 x,y
// //   // x0, y0 - 좌표
// //   // dx, dy - 누적 거리
// //   // vx, vy - 속도
// //   // let [a,b] = useState(0);
// //   let xy = useRef(new Animated.ValueXY({x:1,y:1})).current;
// //   let xy2 = useRef(new Animated.ValueXY({x:1,y:1})).current;
// //   let [ids, v] = useState([0,1]);
// //   let pan = PanResponder.create({
// //     onMoveShouldSetPanResponder:()=>true,
// //     onPanResponderMove:(e, g)=>{
// //       if(g.numberActiveTouches == 2){
// //         if(g.stateID < 0.5){
// //           xy.x.setValue(g.x0);
// //           xy.y.setValue(g.y0);
// //         }
// //         else {
// //           xy2.x.setValue(g.x0);
// //           xy2.y.setValue(g.y0);
// //         }
// //       }
// //     },
// //     onPanResponderRelease:(e, g)=>{
// //       if(g.numberActiveTouches == 2){
// //         if(g.stateID == 0) xy.extractOffset();
// //         else if(g.stateID == 1) xy2.extractOffset();
// //       }
// //     }
// //   });
// //   let toi = (v)=>parseInt(JSON.stringify(v));

// //   let w = Math.sqrt((toi(xy.x) - toi(xy2.x)) * (toi(xy.x) - toi(xy2.x))) + 1;
// //   let h = Math.sqrt((toi(xy.y) - toi(xy2.y)) * (toi(xy.y) - toi(xy2.y))) + 1;
// //   return <View>
// //     <Animated.View
// //     style={{transform:[{rotate:`${w}deg`}, {scaleY:h}]}}
// //     {...pan.panHandlers}>
// //       <View style={{width:300, height:300, backgroundColor:"red"}}/>
// //     </Animated.View>
// //   </View>
// // }

// // function Responder(conf){
// //   return {
// //     onPress:conf.click,
// //     onPressOut:conf.notclick
// //   };
// // }

// // export default ()=>{
// //   let [v, vc] = useState(1);
// //   let resp = Responder({
// //     click:(e,g)=>{ vc(2); },
// //     notclick:(e,g)=>{ vc(1); }
// //   })

// //   return <View>
// //     <Button title="버튼" {...resp}/>
// //     <Animated.Image source={require('./정동혁.jpg')}/>
// //     <Text>{v}</Text>
// //   </View>
// // }

// // export default ()=>{
// //   // 값의 변화에 의해서 화면 구성이 바뀌는 애니메이션
// //   // 내가 직접 어떤 동작을 만들고 해당 동작을 제어해서 애니메이션이 동작하도록
// //   // 사용자 정의 동작에 애니메이션을 연결하기위한 기능 PanResponder
// //   let pan = PanResponder.create({});
// //   let currValue = useRef(new Animated.Value(0)).current;
// //   let currValue2 = useRef(new Animated.Value(0)).current;
// //   let anim = Animated.timing(currValue,{
// //     toValue:1,
// //     duration:2000,
// //     easing:Easing.bezier(0.2, 0.4, 0.5, 0.5),
// //     useNativeDriver:true
// //   });
// //   let anim2 = Animated.timing(currValue2,{
// //     toValue:1,
// //     duration:2000,
// //     easing:Easing.ease,
// //     useNativeDriver:true
// //   });
// //   // Animated에 있는 삼대장 함수
// //   // spring, timing, decay
// //   // decay -> 점진적 감속 -> 내가 가지고 있는 값 => 0
// //   // spring -> 용수철(통통튀다)
// //   // timing -> 내가 직접 목표값과 시간등을 제어하는 방식

// //   return <View>
// //     <Button title="애니메이션 버튼" onPress={()=>{
// //       // Animated.event(null, [], {listener:})
// //       // start - 시작
// //       // delay - 일정시간
// //       // sequence - 애니메이션 배열을 넣으면 순차적으로 동작하도록하는 애니메이션
// //       // parallel - 평행되게 모든 애니메이션이 동시에 동작
// //       // stagger - 일정 시간 이후 동시
// //       // loop - 무한히
// //       // stop - 종료
// //       // Animated.loop(anim).start();
// //       // Animated.loop(anim).stop();
// //       // anim.reset();
// //     }}/>
// //     <Animated.Text {...pan} style={[{backgroundColor:"red"},{transform:[{scaleX:currValue}]}]}>텍스트</Animated.Text>
// //     <Animated.Text style={[{backgroundColor:"blue"},{transform:[{scaleX:currValue2}]}]}>텍스트</Animated.Text>
// //   </View>
// // }

// // 애니메이션 동작을 세밀하게 제어하고 편리하게 생성하며 안전하게 관리하기 위한 기능
// // Animated

// // export default ()=>{
// //   let [v, vc] = useState(0);
// //   let [a, ac] = useState(true);
// //   if(a){
// //     setTimeout(()=>{
// //       if(v >= 300) ac(false);
// //       else vc(v + 1);
// //     }, 51);
// //   }
// //   return <View>
// //     <Text style={{backgroundColor:"red", width:v}}>내용물</Text>
// //   </View>
// // }

// // // Modal 태그 두개
// // // LoadingModal -> 확인 버튼과 Indicator 존재
// // // TextInputModal -> 글자 입력과 확인, 취소 존재

// // export default ()=>{
// //   return <View>
// //     <Link url="https://www.naver.com/"/>
// //     <Link url="https://yalolza.gg/"/>
// //   </View>
// // }

// // // export default ()=>{
// // //   return <View>
// // //     <Text onPress={()=>{
// // //       Alert.alert('https://www.naver.com/', "해당 외부 경로로 이동하시겠습니까?",
// // //       [{
// // //         text:"Cancel",onPress:()=>{}
// // //       },{
// // //         text:"Ok",onPress:()=>{
// // //           Linking.openSettings();
// // //           // Linking.addEventListener("url")
// // //           // Linking.canOpenURL('https://yalolza.gg/').then((support)=>{
// // //           //   if(support){
// // //           //     Linking.openURL('https://yalolza.gg/');
// // //           //   }
// // //           // })
// // //         }
// // //       }], {
// // //         cancelable:true,
// // //         onDismiss:()=>{}
// // //       })
// // //     }}>https://www.naver.com/</Text>
// // //   </View>
// // // }

// // // // export default ()=>{
// // // //   return <View>
// // // //     <Button title="알림창" onPress={()=>{
      
// // // //       // Alert.prompt("제목","내용",[
// // // //       //   {text:"Fail", onPress:(text)=>{}},
// // // //       //   {text:"OK", onPress:(text)=>{}}
// // // //       // ]);
// // // //       Alert.alert("제목","내용",[
// // // //         {text:"Fail", onPress:()=>{}},
// // // //         {text:"OK", onPress:()=>{}}
// // // //       ], {
// // // //         cancelable:true,
// // // //         onDismiss:()=>{}
// // // //       });
// // // //     }}/>
// // // //   </View>
// // // // }

// // // // // export default ()=>{
// // // // //   let [v, vc] = useState(true);
// // // // //   let [v2, vc2] = useState(false);
// // // // //   // let styles = {top:"30%", width:"40%", marginLeft:"30%", backgroundColor:"lightgray"};
// // // // //   // 모달창도 태그
// // // // //   return <View>
// // // // //     <Button title='모달창 띄우기' onPress={()=>{vc(!v)}}/>
// // // // //     <Text>{v2 ? "true" : "false"}</Text>
// // // // //     <Modal visible={v} onRequestClose={()=>{vc(!v); vc2(true)}}>
// // // // //       <View style={[styles.modal, {borderRadius:10}]}>
// // // // //         <Text style={[styles.textColorMain, styles.textAlignCenter]}>내용물</Text>
// // // // //         <Button title="닫기" onPress={()=>{vc(!v); vc2(true)}}/>
// // // // //       </View>
// // // // //     </Modal>
// // // // //     {/* <ActivityIndicator color="red" size="small"/>
// // // // //     <ActivityIndicator color="blue" size="small"/>
// // // // //     <ActivityIndicator color="green" size="large"/>
// // // // //     <ActivityIndicator color="pink" size="large"/> */}
// // // // //   </View>
// // // // // }

// // // // // // web -> 비동기
// // // // // // 버튼 -> 클릭 -> 웹사이트에서 정보를 크롤링

// // // // // // export default ()=>{
// // // // // //   // none, slide, fade
// // // // // //   return <View>
// // // // // //     <StatusBar barStyle="default" hidden={true} animated={true} showHideTransition="none"/>
// // // // // //   </View>
// // // // // //   // let [switchValue, switchChanger] = useState(false);
// // // // // //   // let refresh = ()=>{
// // // // // //   //   switchChanger(true);
// // // // // //   //   setTimeout(()=>{
// // // // // //   //     switchChanger(false);
// // // // // //   //   }, 5000);
// // // // // //   // };
// // // // // //   // return <ScrollView
// // // // // //   //   refreshControl={<RefreshControl refreshing={switchValue} onRefresh={refresh}/>}
// // // // // //   //   >
// // // // // //   //   {/* <Switch 
// // // // // //   //   trackColor={{false:"red",true:"green"}} thumbColor="yellow"
// // // // // //   //   value={switchValue} onValueChange={switchChanger}/> */}
// // // // // //   // </ScrollView>
// // // // // // }

// // // // // // export default ()=>{
// // // // // //   let [value, valueChanger] = useState("");
// // // // // //   let [data, dataChanger] = useState([]);
// // // // // //   return <View>
// // // // // //     <View style={{width:"100%", height:"30%"}}>
// // // // // //       <Text style={{textAlign:"center", fontSize:50, fontWeight:700, color:"black"}}>TodoList</Text>
// // // // // //       <TextInput value={value} onChangeText={valueChanger} placeholder='할 일을 입력하세요!' style={{width:"60%",marginLeft:50,marginRight:50, marginTop:30, borderBottomWidth:3, color:"black", fontSize:20}}/>
// // // // // //       <Pressable onPress={()=>{
// // // // // //         dataChanger([...data, {value:value}]);
// // // // // //         valueChanger("");
// // // // // //       }} style={{backgroundColor:"skyblue", width:60, height:45,position:"absolute", right:50, top:105, borderRadius:4}}>
// // // // // //         <Text style={{color:"white", fontSize:20, textAlign:"center", lineHeight:40}}>등록</Text>
// // // // // //       </Pressable>
// // // // // //     </View>
  
// // // // // //     <FlatList
// // // // // //     data={data}
// // // // // //     renderItem={({item, index})=>{
// // // // // //       return <View style={{borderRadius:4, width:"75%", backgroundColor:"#4565f2",marginLeft:"12.5%", marginTop:15, height:40, justifyContent:"center"}}>
// // // // // //         <Text style={{color:"darkblue", fontWeight:900, fontSize:20, left:10}}>{item.value}</Text>
// // // // // //         <Pressable onPress={()=>{
// // // // // //           dataChanger(data.filter((v,i)=>i != index));
// // // // // //         }} title="삭제" style={{backgroundColor:"#d524d5", width:50, height:"70%", position:"absolute", right:5, borderRadius:4}}>
// // // // // //           <Text style={{color:"white", textAlign:"center", lineHeight:27, fontSize:20}}>삭제</Text>
// // // // // //         </Pressable>
// // // // // //       </View>
// // // // // //     }}
// // // // // //     style={{marginTop:10, height:"70%"}}
// // // // // //     />
// // // // // //   </View>
// // // // // // }

// // // // // // // export default ()=>{
// // // // // // //   let [value, valueChanger] = useState("기본값");
// // // // // // //   // onPress, onPressIn, onPressOut, onLongPress
// // // // // // //   // onPressIn -> onPressOut -> onPress
// // // // // // //   // onPressIn -> onLongPress -> onPressOut
// // // // // // //   return <KeyboardAvoidingView behavior='padding' style={{height:"100%"}}>
// // // // // // //     <Text>상단</Text>
// // // // // // //     <TextInput style={{backgroundColor:"red"}}
// // // // // // //       // value={value} onChangeText={valueChanger}
// // // // // // //       placeholder='힌트'
// // // // // // //       // editable
// // // // // // //       multiline
// // // // // // //       numberOfLines={4}
// // // // // // //       maxLength={30}
// // // // // // //       keyboardType='numeric'
// // // // // // //     />
// // // // // // //     <Text style={{bottom:0, position:"absolute"}}>하단</Text>
// // // // // // //     {/* <ImageBackground resizeMode='repeat' style={{width:"100%", height:"100%", backgroundColor:"black", opacity:0.25}} source={{uri:'https://www.kmaeil.com/news/photo/202106/289125_120304_3210.jpg'}}>
// // // // // // //       <Text style={{color:"red"}}>이 사람들은 알까요?</Text>
// // // // // // //     </ImageBackground> */}
// // // // // // //     {/* <Pressable onPress={()=>{valueChanger(!value)}}>
// // // // // // //       <Image style={{width:300, height:300}} source={value ? require('./정동혁.jpg') : {uri:'https://www.kmaeil.com/news/photo/202106/289125_120304_3210.jpg'}}/>
// // // // // // //     </Pressable> */}
// // // // // // //     {/* <Pressable onPress={()=>{valueChanger(!value)}}>
// // // // // // //       <Image style={{width:300, height:300}} source={{uri:'https://www.kmaeil.com/news/photo/202106/289125_120304_3210.jpg'}}/>
// // // // // // //     </Pressable> */}
// // // // // // //     {/* <Text style={{backgroundColor:value ? "green" : "blue", color:"white"}}>버튼 클릭</Text> */}
// // // // // // //     {/* <TouchableWithoutFeedback onPress={()=>{valueChanger(!value)}}>
// // // // // // //       <Text>버튼 글자</Text>
// // // // // // //     </TouchableWithoutFeedback> */}
// // // // // // //     {/* <TouchableOpacity activeOpacity={0.2} onPress={()=>{valueChanger(!value)}}>
// // // // // // //       <Text>버튼 글자</Text>
// // // // // // //     </TouchableOpacity> */}
// // // // // // //     {/* <TouchableHighlight activeOpacity={0.9} underlayColor="red" onPress={()=>{valueChanger(!value)}}>
// // // // // // //       <Text>버튼 글자</Text>
// // // // // // //     </TouchableHighlight> */}
// // // // // // //     {/* <Button title="버튼글자" onPress={()=>{valueChanger(!value)}}/> */}
// // // // // // //     {/* <Pressable onPress={()=>valueChanger(!value)}>
// // // // // // //       <Text>버튼 글자</Text>
// // // // // // //     </Pressable> */}
// // // // // // //   </KeyboardAvoidingView>
// // // // // // // }

// // // // // // // // export default ()=>{
// // // // // // // //   return <VirtualizedList
// // // // // // // //     getItemCount={()=>5}
// // // // // // // //     getItem={(data,index)=>index + 1}
// // // // // // // //     renderItem={({item})=>{
// // // // // // // //       return <Text>{item}</Text>
// // // // // // // //     }}
// // // // // // // //   />
// // // // // // // // }

// // // // // // // // export default ()=>{
// // // // // // // //   let data = [];
// // // // // // // //   for(let i = 1; i < 10; i += 1){
// // // // // // // //     data.push({value:`${i}`, data:[]});
// // // // // // // //     for(let x = 1; x < 10; x += 1){
// // // // // // // //       data[i - 1].data.push(i * x);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // let data = [
// // // // // // // //   //   {
// // // // // // // //   //     value:"어라",
// // // // // // // //   //     data:[
// // // // // // // //   //       {
// // // // // // // //   //         value:"두번째"
// // // // // // // //   //       },
// // // // // // // //   //       {
// // // // // // // //   //         value:"값"
// // // // // // // //   //       }
// // // // // // // //   //     ]
// // // // // // // //   //   },
// // // // // // // //   //   {
// // // // // // // //   //     value:"동혁씨가",
// // // // // // // //   //     data:[
// // // // // // // //   //       {
// // // // // // // //   //         value:"두번째"
// // // // // // // //   //       },
// // // // // // // //   //       {
// // // // // // // //   //         value:"값"
// // // // // // // //   //       }
// // // // // // // //   //     ]
// // // // // // // //   //   },
// // // // // // // //   //   {
// // // // // // // //   //     value:"나를 버렸어",
// // // // // // // //   //     data:[
// // // // // // // //   //       {
// // // // // // // //   //         value:"두번째"
// // // // // // // //   //       },
// // // // // // // //   //       {
// // // // // // // //   //         value:"값"
// // // // // // // //   //       }
// // // // // // // //   //     ]
// // // // // // // //   //   }
// // // // // // // //   // ];

// // // // // // // //   return <SectionList
// // // // // // // //     sections={data}
// // // // // // // //     renderItem={({item,index})=>{
// // // // // // // //       return <Text>{item}</Text>
// // // // // // // //     }}
// // // // // // // //     renderSectionFooter={({section})=>{
// // // // // // // //       return <Text style={{backgroundColor:"blue"}}>{section.value}</Text>;
// // // // // // // //     }}
// // // // // // // //     renderSectionHeader={({section:{value}})=>{
// // // // // // // //       return <Text style={{backgroundColor:"red"}}>{value}</Text>;
// // // // // // // //     }}
// // // // // // // //   />;

// // // // // // // //   // return <FlatList 
// // // // // // // //   //   data={data}
// // // // // // // //   //   renderItem={
// // // // // // // //   //     ({item, index, separators})=>{
// // // // // // // //   //       return <View>
// // // // // // // //   //         <Text>{item.value}</Text>
// // // // // // // //   //         <FlatList
// // // // // // // //   //           data={item.downList}
// // // // // // // //   //           renderItem={
// // // // // // // //   //             ({item,index})=>{
// // // // // // // //   //               return <Text>{item.value}</Text>
// // // // // // // //   //             }
// // // // // // // //   //           }
// // // // // // // //   //         />
// // // // // // // //   //       </View>
// // // // // // // //   //     }
// // // // // // // //   //   }
// // // // // // // //   // />

// // // // // // // //   // return <ScrollView>
// // // // // // // //   //   <Text style={{height:300}}>텍스트</Text>
// // // // // // // //   //   <Text style={{height:300}}>텍스트</Text>
// // // // // // // //   //   <Text style={{height:300}}>텍스트</Text>
// // // // // // // //   //   <Text style={{height:300}}>텍스트</Text>
// // // // // // // //   // </ScrollView>;
// // // // // // // // };