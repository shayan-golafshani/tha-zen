import React, {useEffect, useState} from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import ReactPlayer from "react-player"
import { tracks } from '../../data/tracks'
import Poems from '../Poems/Poems';
import './App.css';
import { getRandomFromArray } from '../../util';
import FavoritePoems from '../FavoritePoems/FavoritePoems';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { randomPoem } from '../../apiCalls';

function App() {
  const [mainPoem, setMainPoem] = useState([]);
  const [isLoadingPoem, setIsLoadingPoem] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const getPoem = () => {
    setIsLoadingPoem(true)   
      randomPoem()
      .then(jsondata => {
        setIsLoadingPoem(false)
        //console.log(jsondata, 'INSIDE THE GET POEM FETCH')
        if(jsondata) {
        setMainPoem(jsondata[0].lines)
        }
        else {
          throw new Error('Something went wrong, Please try again.')
        }
      })
        .catch(err => {
          setErrMessage('Darn, the server is down! Please try again later.')
          // console.error(err)
        });
}

  useEffect(() => {
    getPoem()
  },[])

  let poem = mainPoem.map((line, index) => {
    return  <p key={index}>
              {line}
            </p>
  }) 
  

let feelingLuckyPage = (
  <>
    <section className="spinning-photo">
      {<img src='https://thisartworkdoesnotexist.com/' className="App-logo" alt="logo" />}
    </section>
    <section className='main-poem'>
      {poem}
    </section >
    <section className='audio-player'>
      <ReactPlayer
        url={getRandomFromArray(tracks)}
      />
    </section>
  </>
)
  return (
    <div className="App">
      <header className="App-header">
        <NavLink to='/'>
          <p className='title-text'>
            Tha-Zen Box! 🌸
          </p>
        </NavLink>
      <section className='Nav-links'>
        <NavLink to='/'>
          <button>
            Feeling lucky!
          </button>
        </NavLink>

        <NavLink to='/poems'>
          <button>
            Search poems
          </button>
        </NavLink>

        <NavLink to='/favorited-poems'>
          <button>
            Fave poems
          </button>
        </NavLink>

      {/* <NavLink to='/songs'>
        <button>
          Songs
        </button>
      </NavLink>

      <NavLink to='/zen-zone'>
        <button>
          Meditation + Affirmations
        </button>
      </NavLink> */}
      </section>
      </header>
      <main>
      <Switch>
        <Route exact path='/'>
          <section className='feeling-lucky-page'>
            {errMessage && <Error message={"We weren't able to grab a random poem for you, mate! Try again."} />}
            {isLoadingPoem && <Loading />}
            {(!isLoadingPoem && !errMessage) && feelingLuckyPage}
          </section>
        </Route>

        <Route exact path ='/poems'>
          <Poems />
        </Route>

        <Route exact path ='/favorited-poems'>
          <FavoritePoems />
        </Route>

        <Route >
          <Error />
        </Route>
      </Switch>
      </main>
    </div>
  );
}

export default App;
