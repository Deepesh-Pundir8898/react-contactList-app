import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const contactListCollection = collection(db, "contactList");

const initialState = {
    items: [], 
    status: "idle",
    error: null, 
};

// Add Contact
export const addContact = createAsyncThunk("contactList/addContact", async (userData, { rejectWithValue }) => {
    try {
        const docRef = await addDoc(contactListCollection, userData);
        return { id: docRef.id, ...userData }; // Return full contact data for Redux
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Fetch Contacts 
export const fetchContacts = createAsyncThunk("contactList/fetchContacts", async (_, { rejectWithValue }) => {
    try {
        const querySnapshot = await getDocs(contactListCollection);
        const contacts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return contacts;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Delete Contact
export const deleteContact = createAsyncThunk("contactList/deleteContact", async (id, { rejectWithValue }) => {
    try {
        await deleteDoc(doc(contactListCollection, id));
        return id; 
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Update Contact
export const updateContact = createAsyncThunk("contactList/updateContact", async ({ id, updates }, { rejectWithValue }) => {
    try {
        const contactDoc = doc(contactListCollection, id);
        await updateDoc(contactDoc, updates);
        return { id, updates };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Toggle Favorite Contact
export const toggleFavoriteContact = createAsyncThunk("contactList/toggleFavoriteContact", async (id, { getState, rejectWithValue }) => {
    try {
        const contact = getState().contact.items.find((item) => item.id === id);
        const contactDoc = doc(contactListCollection, id);
        await updateDoc(contactDoc, { favorite: !contact.favorite });
        return { id, favorite: !contact.favorite }; 
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const contactSlice = createSlice({
    name: "contactList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter((contact) => contact.id !== action.payload);
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const { id, updates } = action.payload;
                const existingContact = state.items.find((contact) => contact.id === id);
                if (existingContact) {
                    Object.assign(existingContact, updates);
                }
            })
            .addCase(toggleFavoriteContact.fulfilled, (state, action) => {
                const { id, favorite } = action.payload;
                const existingContact = state.items.find((contact) => contact.id === id);
                if (existingContact) {
                    existingContact.favorite = favorite;
                }
            });
    },
});

export const contactListAction = contactSlice.actions;
export default contactSlice;
