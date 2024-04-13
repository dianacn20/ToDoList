import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  TextInput, 
  Keyboard,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import colors from '../Colors';

const ToDoModal = ({ list, closeModal, updateList }) => { 
  const [newTodo, setNewTodo] = useState(""); // introducerea unui nou element în lista de sarcini.

  const toggleTodoCompleted = index => { // Funcție pentru a comuta starea unei sarcini între completată și ne-completată.
    const updatedList = { ...list };
    updatedList.todos[index].completed = !updatedList.todos[index].completed; 
    updateList(updatedList); 
  }

  const addTodo = () => { // Funcție pentru a adăuga o nouă sarcină în listă.
    const updatedList = { ...list };
    updatedList.todos.push({ title: newTodo, completed: false }); // Adăugăm o nouă sarcină la finalul listei cu textul introdus și starea inițială ne-completată.
    updateList(updatedList); 
    setNewTodo(""); 
    Keyboard.dismiss(); // Ascundem tastatura.
  }

  const deleteToDo = index => { // Funcție pentru a șterge o sarcină din listă.
    let updatedList = { ...list }; 
    updatedList.todos.splice(index, 1); 
    updateList(updatedList); 
  }

  const renderTodo = (todo, index) => { // Funcție pentru a afișa o sarcină din listă.
    return (
      <View style={styles.todoContainer}> {/* Container pentru o sarcină */}
        <TouchableOpacity onPress={() => toggleTodoCompleted(index)}> {/* Buton pentru a marca sarcina ca făcută sau nefăcută */}
          <MaterialIcons 
            name={todo.completed ? 'check-box' :'check-box-outline-blank'} 
            size={24} 
            color={colors.violet} 
            style={{ width: 32 }} 
          />
        </TouchableOpacity>
        <Text 
          style={[
            styles.todo, 
            { 
              textDecorationLine: todo.completed ? 'line-through' : 'none', // Text tăiat dacă sarcina este completată
              color: todo.completed ? colors.violet : colors.black // Text violet dacă sarcina este completată, altfel negru
            }
          ]}
        >
          {todo.title} {/* Textul sarcinii */}
        </Text>
        <TouchableOpacity onPress={() => deleteToDo(index)}> {/* Buton pentru a șterge sarcina */}
          <View >
            <Text style={styles.deleteButton}>Delete</Text> {/* Text pentru a șterge sarcina */}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const taskCount = list.todos.length; // Numărul total de sarcini din listă.
  const completedCount = list.todos.filter(todo => todo.completed).length; // Numărul sarcinilor completate din listă.

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'> {/* Evităm tastatura și asigurăm că ecranul rămâne vizibil */}
      <SafeAreaView style={styles.container}> {/* Asigurăm că conținutul este vizibil pe ecran */}
        <TouchableOpacity 
          style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }} 
          onPress={closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
          <View>
            <Text style={styles.title}>{list.name}</Text> {/* Afișăm numele listei */}
            <Text style={styles.taskCount}>{completedCount} of {taskCount} tasks</Text> {/* Afișăm numărul de sarcini completate */}
          </View>
        </View>

        <View style={[styles.section, { flex: 3 }]}>
          <FlatList 
            data={list.todos} // Datele pentru lista de sarcini
            renderItem={({ item, index }) => renderTodo(item, index)} // Funcția pentru a afișa fiecare sarcină
            keyExtractor={item => item.title} // Extragem o cheie unică pentru fiecare sarcină
            contentContainerStyle={{ paddingHorizontal: 32, paddingTop: 64 }} 
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]}>
          <TextInput 
            style={[styles.input, { borderColor: list.color }]} 
            onChangeText={text => setNewTodo(text)} 
            value={newTodo} 
          />
          <TouchableOpacity 
            style={[styles.addTodo, { backgroundColor: list.color }]}
            onPress={() => addTodo()}
          >
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  section: {
    alignSelf: "stretch"
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    padding: 16
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.violet,
    fontWeight: "600"
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderColor: colors.black,
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16
  },
  deleteButton: {
    backgroundColor: colors.violet,
    color: colors.black,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  }
});

export default ToDoModal;
