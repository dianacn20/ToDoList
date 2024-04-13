import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Modal 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './Colors';
import temp from './temp';
import ToDoList from './components/ToDoList';
import AddListModel from './components/AddListModel';

const App = () => {
  const [addTodoVisible, setAddTodoVisible] = useState(false);                      // Afișarea sau ascunderea modalul de adăugare a unei liste.
  const [lists, setLists] = useState(temp);                                         // Definim starea lists și funcția setLists pentru a gestiona listele de sarcini.

  const toggleAddModal = () => { // Funcție pentru a comuta între afișarea și ascunderea modalului de adăugare a unei liste.
    setAddTodoVisible(!addTodoVisible);
  }

  const renderList = list => { // Funcție pentru a afișa o listă de sarcini.
    return <ToDoList list={list} updateList={updateList} />;
  }

  const addList = list => { // Funcție pentru a adăuga o nouă listă.
    setLists(prevLists => ([...prevLists, { ...list, id: prevLists.length + 1, todos: [] }]));
  };

  const updateList = list => { // Funcție pentru a actualiza o listă existentă.
    setLists(prevLists => (prevLists.map(item => (item.id === list.id ? list : item))));
  };

  return (
    <View style={styles.container}> {/* Returnăm o componentă View care conține întreaga aplicație.*/}
      <Modal 
        animationType="slide" 
        visible={addTodoVisible} 
        onRequestClose={toggleAddModal}
      >
        <AddListModel closeModal={toggleAddModal} addList={addList} />
      </Modal>
      
      <View style={{ flexDirection: "row" }}> {/* Componentă View care conține titlul aplicației și un buton de adăugare a unei liste.*/}
        <View style={styles.divider} /> 
        <Text style={styles.title}> 
          Todo <Text style={{ fontWeight: "600", color: colors.purple }}> Lists</Text>
        </Text>
        <View style={styles.divider} /> {/*Linie orizontală pentru a separa titlul.*/}
      </View>

      
      <View style={{ marginVertical: 48 }}> 
        <TouchableOpacity style={styles.addList} onPress={toggleAddModal}> {/* Butonul de adăugare a unei noi liste.*/}
          <AntDesign name="plus" size={16} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text> 
      </View>

      <View style={{ height: 275, paddingLeft: 32 }}> {/* O componentă View care conține lista de sarcini.*/}
        <FlatList 
          data={lists} // Datele listelor de sarcini.
          keyExtractor={item => item.name} // Funcție pentru a extrage cheia unică a fiecărui element din listă.
          horizontal={true} // Afișăm lista orizontal.
          showsHorizontalScrollIndicator={false} // Nu afișăm indicatorul de scroll orizontal.
          renderItem={({ item }) => renderList(item)} // Funcția pentru a afișa fiecare element din listă.
          keyboardShouldPersistTaps="always" // Păstrăm tastarea pe ecran când se apasă.
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.purple,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.purple,
    borderRadius: 4, 
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    color: colors.purple,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8 
  }
});

export default App;
