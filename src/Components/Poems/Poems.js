import React, {useEffect, useState} from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';

import './Poems.css';


function Poem() {
  
  const [allAuthors, setAllAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [allPoems, setAllPoems] = useState([]);
  const [errMessage, setErrMessage] = useState('');

  const getAuthors = () => {   
      fetch('https://poetrydb.org/author')
      .then(response => response.json())
      .then(jsondata => {
        
        console.log(jsondata)
        setAllAuthors(jsondata)})
      .catch(err => console.error(err));
}

  useEffect(() => {
    getAuthors()
    
  },[])

  let poem = mainPoem.map((line, index) => {
    return  <p key={index}>
              {line}
            </p>
  }) 

  return (
    
    {/*
        <PoemCard >

    </PoemCard>
     */}
  );
}

export default App;
