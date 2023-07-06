import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment, { utc } from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const HomeScreen = ({navigation}) => {
  const [todos, setTodos] = useState([]);
  const ref = firestore().collection('Users');
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [delteItem, setDelteItem] = useState(null)
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, Description, Date, complete} = doc.data();
        list.push({
          id: doc.id,
          title: title,
          Description: Description,
          Date: Date,
          complete,
        });
      });
      console.log('show todo', list);
      setTodos(list);
    });
  }, []);

  // ...

  const handleLongPress=async(item)=>{
     setDeleteIcon(true)
     setDelteItem(item)
  }
  const handleDeleteIconPress=async()=>{
    setDeleteIcon(false)
    await firestore()
    .collection('Users')
    .doc(delteItem?.id)
    .delete({
      delteItem
    });
  }

  const handleCompleteAction=async(item)=>{
    await firestore()
    .collection('Users')
    .doc(item?.id)
    .update({
      complete: !item.complete,
    });
  }

  const handleOnpres=(item)=>{
     navigation.navigate("add",item)
  }
  const dateConverter =(item)=>{
    const {seconds, nanoseconds} = item;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const dateObject = new Date(milliseconds);
    return dateObject;
  }
  const renderItem = ({item}) => {
    console.log("show item dataeeee",item.Date)
    return (
      <TouchableOpacity style={{...styles.todoContainerMain,backgroundColor:item.complete?"rgba(33, 32, 33, 0.27)":'#ffff'}} onLongPress={()=>handleLongPress(item)}  >
        <View style={styles.todoContainer}>
          <Text style={styles.titleText}>
            <Text style={styles.headingsStyle}>Title:</Text> {item.title}
          </Text>
          <Text style={styles.discriptionText}>
            <Text style={styles.headingsStyle}>Description:</Text>
            {item.Description}
          </Text>
          <Text style={styles.dateStyle}>
            <Text style={styles.headingsStyle}>Date:</Text>
            {moment(dateConverter(item.Date)).format('DD-MM-YYYY')}
          </Text>
        </View> 
        <View style={styles.iconBtnContainer}>
          <TouchableOpacity onPress={()=>handleCompleteAction(item)}>
            <Icon name="checkcircle" size={30} style={{...styles.iconStyle, color:item.complete?"green":'lightgrey'}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleOnpres(item)} >
            <EntypoIcon name="pencil" size={30} style={{...styles.iconStyle, color:'green'}} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.tasklistStyle}>List of Tasks</Text>
      
          <TouchableOpacity onPress={()=>handleDeleteIconPress()}>
            <Icon name="delete" size={30} color={deleteIcon? 'red':'grey'}  />
          </TouchableOpacity>
   
      </View>

      <TouchableOpacity
        style={styles.touchContainer}
        onPress={() => navigation.navigate('add')}>
        <Text style={styles.texstyle}>Add</Text>
      </TouchableOpacity>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={todos}
          keyExtractor={val => val.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tasklistStyle: {
    fontSize: 25,
    color: 'red',
  },
  touchContainer: {
    position: 'absolute',
    bottom: 10 ,
    right: 30,
    backgroundColor: 'green',
    height: 40,
    width: "100%",
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // elevation:0.5
    // borderWidth: 1,
    // borderColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: 70,
    // position: 'absolute',
    // top: 380,
    // right: 20,
    // height: 70,
    // backgroundColor: 'red',
    // borderRadius: 100,
  },
  texstyle: {
    color: 'white',
    fontSize: 20,
  },
  todoContainer: {
    width: '80%',
  },
  todoContainerMain: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    marginTop: 30,
    marginBottom: 100,
  },
  headingsStyle: {
    fontSize: 18,
    color: 'black',
  },
  iconBtnContainer: {
    width: '20%',
  },
  iconStyle: {
    marginTop: 15,
    // backgroundColor:'red',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
   
    // padding:10
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
