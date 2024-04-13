import React, { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors';

const AddListModel = ({ addList, closeModal }) => { 
    const backgroundColors = ["#B9FBC0", "#98F5E1", "#8EECF5", "#90DBF4", "#A3C4F3", "#CFBAF0", "#F1C0E8"]; // Definim culorile disponibile pentru liste.

    const [name, setName] = useState(""); 
    const [color, setColor] = useState(backgroundColors[0]); 

    const createTodo = () => { // Funcție pentru a crea o nouă listă de sarcini.
        const list = { name, color }; 
        addList(list); // Adăugăm lista la listele existente.
        setName(""); // Resetăm numele listei.
        closeModal(); // Închidem modalul de adăugare a listei.
    }

    const renderColors = () => { // Funcție pentru a afișa culorile disponibile pentru selecție.
        return backgroundColors.map(color => ( 
            <TouchableOpacity 
                key={color} 
                style={[styles.colorSelect, { backgroundColor: color }]} 
                onPress={() => setColor(color)} 
            />
        ));
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'> {/* Componenta pentru evitarea tastaturii */}
            <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={closeModal}> {/* Butonul de închidere a modalului */}
                <AntDesign name="close" size={24} color={colors.black} /> {/* Iconița pentru închidere */}
            </TouchableOpacity>

            <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                <Text style={styles.title}>Create Todo List</Text> {/* Titlul pentru modal */}
                <TextInput 
                    style={styles.input} 
                    placeholder='Enter list name' 
                    onChangeText={text => setName(text)} // Actualizăm numele listei când este introdus
                    value={name} // Valoarea câmpului de introducere
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                    {renderColors()} {/* Afisăm culorile disponibile pentru alegere */}
                </View>

                <TouchableOpacity 
                    style={[styles.create, { backgroundColor: color }]} 
                    onPress={createTodo}    
                >
                    <Text style={{ color: colors.white, fontWeight: "600" }}> Create!</Text> {/* Text pentru butonul de creare */}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.pink,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
});

export default AddListModel;
