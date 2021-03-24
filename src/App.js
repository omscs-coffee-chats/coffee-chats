import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }

function App() {

  return (
    <div className="App">
      <h1>OMSCS Coffee Chats</h1>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);