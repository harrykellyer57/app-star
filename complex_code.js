/**
 * complex_code.js
 *
 * Description:
 * This complex JavaScript code demonstrates an event-driven web application
 * that interacts with an API to fetch and display information related to books,
 * perform CRUD operations on books, and persist book data to a database.
 *
 * Note:
 * This code snippet is just a sample and may not actually work as it requires
 * a server-side implementation, API keys, and a database connection.
 *
 * Author: Your Name
 * Date: August 1, 2022
 */

// Utilizing different JavaScript modules
import { EventEmitter } from 'events';
import axios from 'axios';
import mongodb from 'mongodb';

// Declare global variables
const apiUrl = 'https://api.example.com/books';
let books = [];

// Create an event emitter
const eventEmitter = new EventEmitter();

// Event listener for 'update' event
eventEmitter.addListener('update', async () => {
  try {
    const response = await axios.get(apiUrl);
    books = response.data;
    console.log('Books updated successfully', books);
  } catch (error) {
    console.error('Failed to update books', error);
  }
});

// Function to fetch books from the API
async function fetchBooks() {
  try {
    const response = await axios.get(apiUrl);
    books = response.data;
    console.log('Books fetched successfully', books);
  } catch (error) {
    console.error('Failed to fetch books', error);
  }
}

// Function to add a new book
async function addBook(book) {
  try {
    const response = await axios.post(apiUrl, book);
    books.push(response.data);
    console.log('Book added successfully', book);
    eventEmitter.emit('update'); // Trigger the 'update' event
  } catch (error) {
    console.error('Failed to add book', error);
  }
}

// Function to update an existing book
async function updateBook(bookId, newData) {
  try {
    const updateUrl = `${apiUrl}/${bookId}`;
    const response = await axios.put(updateUrl, newData);
    const updatedBook = response.data;
    const index = books.findIndex((book) => book._id === updatedBook._id);
    books[index] = updatedBook;
    console.log('Book updated successfully', updatedBook);
    eventEmitter.emit('update'); // Trigger the 'update' event
  } catch (error) {
    console.error('Failed to update book', error);
  }
}

// Function to delete a book
async function deleteBook(bookId) {
  try {
    const deleteUrl = `${apiUrl}/${bookId}`;
    await axios.delete(deleteUrl);
    books = books.filter((book) => book._id !== bookId);
    console.log('Book deleted successfully', bookId);
    eventEmitter.emit('update'); // Trigger the 'update' event
  } catch (error) {
    console.error('Failed to delete book', error);
  }
}

// Function to perform database operations using MongoDB
async function performDatabaseOperations() {
  try {
    const url = 'mongodb://localhost:27017';
    const dbName = 'library';
    const client = await mongodb.MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection('books');
  
    // Insert a book document
    const insertResult = await collection.insertOne({ title: 'Sample Book', author: 'John Doe' });
    console.log('Book inserted successfully', insertResult.ops[0]);
  
    // Update a book document
    const updateResult = await collection.updateOne({ title: 'Sample Book' }, { $set: { author: 'Jane Smith' } });
    console.log(`${updateResult.modifiedCount} book updated successfully`);
  
    // Find all books
    const findResult = await collection.find({}).toArray();
    console.log('Books found', findResult);
  
    // Delete a book document
    const deleteResult = await collection.deleteOne({ title: 'Sample Book' });
    console.log(`${deleteResult.deletedCount} book deleted successfully`);
  
    // Close the database connection
    client.close();
  } catch (error) {
    console.error('Failed to perform database operations', error);
  }
}

// Example usage of the defined functions
fetchBooks();
addBook({ title: 'New Book', author: 'New Author' });
updateBook('bookId', { author: 'Updated Author' });
deleteBook('bookId');
performDatabaseOperations();