import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddTask = ({navigation, route}) => {
  const [Title, setTitle] = useState('');
  const [Descriptions, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  console.log('show date', date);

  console.log('show route data', route);
  const {Description, complete, id, title} = route?.params || {};
  let newDate = route?.params?.Date || {};

  const {seconds, nanoseconds} = newDate;
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const dateObject = new Date(milliseconds);

  console.log(dateObject);

  console.log('shwo update data', newDate);

  let data = {
    title: Title,
    Description: Descriptions,
    Date: date,
    complete: false,
  };
  const handleOnsubmit = () => {
    console.log('show task item', data);
    if (route?.params?.Description.length > 0) {
      if (Title.length == 0) {
        alert('please Enter title');
      } else if (Descriptions?.length == 0) {
        alert('Please enter Description');
      } else {
        firestore()
          .collection('Users')
          .doc(id)
          .update(data)
          .then(() => {
            alert('Task updated!');
          });
        navigation.navigate('Home');
      }
    } else {
      if (Title.length == 0) {
        alert('please Enter title');
      } else if (Descriptions?.length == 0) {
        alert('Please enter Description');
      } else {
      firestore()
        .collection('Users')
        .add(data)
        .then(() => {
          alert('Task added!');
        });
        navigation.navigate('Home');}
     
    }
  };

  React.useEffect(() => {
    if (route?.params?.Description.length > 0) {
      setDescription(Description);
      setDate(dateObject);
      setTitle(title);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={30} />
        </TouchableOpacity>

        <Text style={styles.headingStyle}>Add New Task</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Enter Title"
          onChangeText={val => setTitle(val)}
          style={styles.inputStyle}
          value={Title}
        />
        <TextInput
          scrollEnabled
          multiline
          placeholder="Enter Description"
          onChangeText={val => setDescription(val)}
          style={{...styles.inputStyle, marginTop: 10, height: 50}}
          value={Descriptions}
        />
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.dateContainer}>
          <Icon name="calendar" size={30} style={styles.calenderstyle} />
          <Text style={styles.dateTextContainer}>
            {moment(date).format('DD-MM-YYYY')}
          </Text>
        </TouchableOpacity>

        <DatePicker
          modal
          open={open}
          mode="date"
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.touchContainer}
        onPress={() => handleOnsubmit()}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  headingStyle: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 22,
    left: 60,
    // marginTop: 30,
  },
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  formContainer: {
    backgroundColor: 'lightgrey',
    padding: 15,
    marginTop: 50,
    borderRadius: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    // justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    // left:5
  },
  dateTextContainer: {
    paddingLeft: 4,
    color: 'black',
    fontWeight: 'bold',
    left: 5,
  },
  calenderstyle: {
    left: 4,
  },
  touchContainer: {
    height: 40,
    width: '100%',
    backgroundColor: 'green',
    marginTop: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
