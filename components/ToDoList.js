import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import colors from '../Colors';
import ToDoModal from "./ToDoModal";

const ToDoList = ({ list, updateList }) => { 
    const [showListVisible, setShowListVisible] = useState(false); 

    const toggleListModal = () => { // Funcție pentru a comuta vizibilitatea modalului.
        setShowListVisible(!showListVisible);
    };

    const completedCount = list.todos.filter(todo => todo.completed).length; // Numărul de sarcini completate din listă.
    const remainingCount = list.todos.length - completedCount; // Numărul de sarcini rămase din listă.

    return (
        <View> {/* Container pentru lista de sarcini */}
            <Modal 
                animationType="slide" 
                visible={showListVisible} 
                onRequestClose={toggleListModal}
            >
                <ToDoModal list={list} closeModal={toggleListModal} updateList={updateList} /> {/* Afișăm modalul pentru gestionarea sarcinilor */}
            </Modal>
            <TouchableOpacity 
                style={[styles.listContainer, {backgroundColor: list.color}]} // Stilurile pentru containerul listei, culoarea fiind setată din propietatea list.color
                onPress={toggleListModal} // Deschidem modalul când este apăsat containerul listei
            >
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list.name} {/* Afișăm numele listei */}
                </Text>
    
                <View>
                    <View style={styles.countContainer}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                    <View style={styles.countContainer}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subtitle}>Completed</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 16,
        alignItems: "center",
        width: 200
    },
    listTitle: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 24,
        marginBottom: 18 
    },
    countContainer: {
        alignItems: "center",
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    }
});

export default ToDoList;
